
// Slumpy way of detecting text elements
export const elementIsTextType = el => !el.type
export const controlIsFunctionType = type => typeof type === 'function'
//export const isSupportedType = type => supportedNativeTypes.indexOf(type) !== -1 || isFunctionElement(type)
