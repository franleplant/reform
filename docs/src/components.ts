import * as ts from "typescript";
import * as helpers from "./helpers";
import { TypeNode, Node } from "./types";
import Context from "./Context";
import { INDENT_SYMBOL, CODE_TAGS_OPEN, CODE_TAGS_CLOSE } from "./constants";

//TODO renderSection and renderTypeOfNode

const KIND_FUNCTION = 64;
const KIND_STRING_OBJECT_LITERAL = "Object literal";
const KIND_STRING_VARIABLE = "Variable";
const KIND_STRING_EXTERNAL_MODULE = "External module";
const KIND_STRING_INTERFACE = "Interface";
const KIND_STRING_PROPERTY = "Property";
const KIND_STRING_TYPE_LITERAL = "Type literal";
const KIND_STRING_TYPE_ALIAS = "Type alias";

export function renderNode(node: Node, context: Context): Array<string> {
  //console.log(ts.SyntaxKind.PropertyDeclaration, ts.SyntaxKind.PropertyAssignment, ts.SyntaxKind.PropertySignature )
  //console.log(node.kind, node.kindString )
  switch (node.kind) {
    case KIND_FUNCTION:
      return renderFunction(node, context);
    case ts.SyntaxKind.VariableDeclaration:
      return renderVariable(node, context);
    default: {
      switch (node.kindString) {
        case KIND_STRING_EXTERNAL_MODULE:
          return renderExternalModule(node, context);
        case KIND_STRING_INTERFACE:
          return renderInterface(node, context);
        case KIND_STRING_OBJECT_LITERAL:
          return renderObjectLiteral(node, context);
        case KIND_STRING_VARIABLE:
          return renderVariable(node, context);
        case KIND_STRING_PROPERTY:
          return renderProperty(node, context);
        case KIND_STRING_TYPE_LITERAL:
          return renderTypeLiteral(node, context);
        case KIND_STRING_TYPE_ALIAS:
          return renderTypeAlias(node, context);
      }
      return [];
    }
  }
}

export function renderNodes(
  nodes: Array<Node>,
  context: Context
): Array<string> {
  let lines: Array<string> = [];
  nodes.forEach(node => {
    lines = lines.concat(renderNode(node, context));
  });

  return lines;
}

export function renderFunctionSignature(node: Node, context: Context): string {
  const params = (node.parameters || [])
    .map(param => `${param.name}: ${renderType(param.type, context)}`)
    .join(", ");

  const signature = `(${params}): ${renderType(node.type, context)}`;

  // Special case for inline, anonymous function signaruters in interfaces
  if (node.name === "__call") {
    return signature;
  }

  return `${node.name}${signature}`;
}

export function renderFunction(node: Node, context: Context): Array<string> {
  if (context.inline) {
    return (node.signatures || []).map(
      sign => `${renderFunctionSignature(sign, context)}`
    );
  }

  let signatureStrings: Array<string> = [] as any;
  (node.signatures || []).forEach(signatureNode => {
    const signature = [
      ``,
      `${helpers.renderComments(signatureNode)}`,
      ``,
      CODE_TAGS_OPEN,
      renderFunctionSignature(signatureNode, context),
      CODE_TAGS_CLOSE,
      ``,
    ];

    signatureStrings = signatureStrings.concat(signature);
  });

  return [`## ${helpers.renderTitle(node)}`, ...signatureStrings];
}

export function renderExternalModule(
  node: Node,
  context: Context
): Array<string> {
  return [
    `# ${helpers.renderTitle(node)}`,
    ...renderNodes(node.children, context),
  ];
}

export function renderType(
  typeNode: TypeNode,
  context: Context
): Array<string> {
  //console.log('TYPE', node)

  switch (typeNode.type) {
    case "array": {
      if (typeNode.elementType) {
        return [
          `Array\\<${renderType(
            typeNode.elementType,
            context.setInline(true)
          )}\\>`,
        ];
      }
      break;
    }
    case "intrinsic": {
      return [typeNode.name];
    }
    case "tuple": {
      const elements = (typeNode.elements || [])
        .map(element => renderType(element, context))
        .join(", ");

      return [`[${elements}]`];
    }
    case "reference": {
      if (typeNode.name.includes("/src/")) {
        const name = helpers.absoluteToRelativePathHelper(
          typeNode.name.replace(/"/g, "")
        );
        return [`[${name}](#user-content-#${typeNode.id})`];
      }
      break;
    }
    case "reflection":
      // Inline Type literal declarations
      if (
        typeNode.declaration &&
        typeNode.declaration.kindString === "Type literal"
      ) {
        return renderNode(typeNode.declaration, context);
      }
      break;

    case "union":
      const content = (typeNode.types || [])
        .map(t => renderType(t, context).join(" "))
        .join(" | ");
      return [content];
    case "stringLiteral":
      return ["String"];

    default:
      if (typeNode.name === "(Anonymous function)") {
        return ["Function"];
      }
  }
  // sums are broken
  //if (type.type === 'unknown' && type.name.includes('&')) {
  //return type.name.split('&').map(s => s.trim()).map(t => typeHelper(t)).join(' & ');
  //}

  let typeStr;
  if (typeNode.id) {
    typeStr = `[${typeNode.name}](#user-content-#${typeNode.id})`;
  } else {
    typeStr = `${typeNode.name}`;
  }

  if (typeNode.typeArguments || typeNode.typeParameters) {
    const tas = (typeNode.typeArguments || typeNode.typeParameters)
      .map((ta: TypeNode) => renderType(ta, context))
      .join(", ");

    typeStr += `\\<${tas}\\>`;
  }

  return [typeStr];
}

export function renderObjectLiteral(
  node: Node,
  context: Context
): Array<string> {
  const children = (node.children || []).map(
    child =>
      `${child.name}: ${renderNode(child, context.setInline(true)).join(" ")}`
  );

  const lines = [
    CODE_TAGS_OPEN,
    "{",
    ...indent(children),
    "}",
    CODE_TAGS_CLOSE,
  ];

  if (context.inline) {
    return lines;
  }

  return [
    `## ${helpers.renderTitle(node)}`,
    `${helpers.renderComments(node)}`,
    ...lines,
  ];
}

export function renderInterface(node: Node, context: Context): Array<string> {
  let children: Array<string> = [] as any;
  (node.children || []).forEach(child => {
    const childContent = renderNode(child, context.setInline(true));
    let content;
    if (childContent.length === 1) {
      content = [`${child.name}: ${childContent.join("")}`];
    } else {
      content = [`${child.name}:`, ...childContent];
    }

    children = children.concat(content);
  });

  //TODO can we use the same as the function signature?
  const indexSignatures = (node.indexSignature || []).map(sig => {
    const params = sig.parameters;
    const param = params[0];
    return `\\[${param.name}: ${renderType(
      param.type,
      context
    )}\\]: ${renderType(sig.type, context)}`;
  });

  const signatures = (node.signatures || []).map(sig =>
    renderFunctionSignature(sig, context)
  );

  const content = [
    CODE_TAGS_OPEN,
    "{",
    ...indent(children),
    ...indent(indexSignatures),
    ...indent(signatures),
    "}",
    CODE_TAGS_CLOSE,
  ];

  // TODO do we really need inline interfaces?
  //if (inline) {
  //return content.join('\n');
  //}

  return [
    `## ${helpers.renderTitle(node)}`,
    helpers.renderComments(node),
    ...content,
  ];
}

export function renderVariable(node: Node, context: Context): Array<string> {
  // Special case
  if (node.name === "validators") {
    return ["[./src/validators](./src/validators)"];
  }

  return renderType(node.type, context);
}

export function renderProperty(node: Node, context: Context): Array<string> {
  if (context.inline) {
    return renderType(node.type, context);
  }
  return [`${node.name}: ${renderType(node.type, context).join("TODO")}`];
}

export function renderTypeLiteral(
  node: Node,
  _context: Context
): Array<string> {
  let context = _context;
  if (node.name === "__type") {
    context = context.setInline(true);
  }

  let children: Array<string> = [] as any;
  (node.children || []).forEach(child => {
    const childContent = renderNode(child, context.setInline(true));
    let content;
    if (childContent.length === 1) {
      content = [`${child.name}: ${childContent.join("")}`];
    } else {
      content = [`${child.name}:`, ...indent(childContent)];
    }

    children = children.concat(content);
  });

  //TODO can we use the same as the function signature?
  const indexSignatures = (node.indexSignature || []).map(sig => {
    const params = sig.parameters;
    const param = params[0];
    return `\\[${param.name}: ${renderType(
      param.type,
      context.setInline(true)
    )}\\]: ${renderType(sig.type, context.setInline(true))}`;
  });

  const signatures = (node.signatures || []).map(sig =>
    renderFunctionSignature(sig, context.setInline(true))
  );

  const content = [...children, ...indexSignatures, ...signatures];

  if (context.inline) {
    return ["{", ...indent(content), "}"];
  }

  return [
    `## ${helpers.renderTitle(node)}`,
    `${helpers.renderComments(node)}`,
    CODE_TAGS_OPEN,
    "{",
    ...indent(content),
    "}",
    CODE_TAGS_CLOSE,
  ];
}

export function renderTypeAlias(node: Node, context: Context): Array<string> {
  let content: Array<string> = [] as any;

  if (node.type) {
    content = content.concat(renderType(node.type, context));
  }

  const obj = [CODE_TAGS_OPEN, ...content, CODE_TAGS_CLOSE];

  if (context.inline) {
    return obj;
  }

  return [
    `## ${helpers.renderTitle(node)}`,
    `${helpers.renderComments(node)}`,
    ...obj,
  ];
}

export function indent(lines: Array<string>): Array<string> {
  return lines.map(line => `${INDENT_SYMBOL}${line}`);
}
