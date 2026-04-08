import { isReactiveCustomElement } from "./ReactiveElement";

export function isElementAList(element) {
  return element.tagName === "OL" || element.tagName === "UL";
}

export function isElementAListItem(element) {
  return element.tagName === "LI";
}

export function getCustomElementFromMappedElement(element) {
  if (isReactiveCustomElement(element)) return element;
  if (isReactiveCustomElement(element.firstElementChild)) return element.firstElementChild;
}
