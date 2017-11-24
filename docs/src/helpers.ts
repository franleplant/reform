import * as path from "path";
import { Node, CommentTag } from "./types";

export function renderKindString(node: Node): string {
  if (node.kindString === "External module") {
    return "Module";
  }

  return node.kindString;
}

export function renderSrc(node: Node): string {
  const src = node.sources[0];
  return `./src/${src.fileName}#L${src.line}`;
}

export function renderTitle(node: Node): string {
  const kindString = renderKindString(node);

  // TODO probably move this to renderSRc?
  let src = "";
  //console.log(node)
  if (node.sources) {
    src = `[src](${renderSrc(node)})`;
  }
  return [
    node.name,
    `<small>${kindString} ${src}</small>`,
    node.id ? `<a id="#${node.id}"></a>` : "",
  ].join(" ");
}

export function renderComments(node: Node): string {
  const comment = node.comment || ({} as any);
  const content = [];
  if (comment.shortText && comment.text) {
    content.push(comment.shortText);
    content.push("");
    content.push(comment.text);
  } else if (comment.shortText) {
    content.push(comment.shortText);
  } else if (comment.text) {
    content.push(comment.text);
  }

  const tags = comment.tags || [];
  const contentTags = [];
  if (tags.length) {
    contentTags.push("Tags");
    contentTags.push("\n");
    contentTags.push(
      tags.map((tag: CommentTag) => `- ${tag.tag} ${tag.text}`).join("\n")
    );
  }

  return [...content, "", ...contentTags].join("\n");
}

export function absoluteToRelativePathHelper(absolutePath: string): string {
  const root = path.resolve(__dirname, "../../");
  return "./" + path.relative(root, absolutePath);
}
