/**
 * 
 * @param {object} elemParent 
 * @returns 
 */
function handleImgLoad(elemParent) {
  return ({ target }) => {
    elemParent.append(target);
  };
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function stringToColour(str='') {
  let hash = 0;
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
}

/**
 *
 * @param {string} tag
 * @param {object} options {classNames, attributes, styles, events}
 * @param  {...nodes} children
 * @returns {element}
 */
function createElement(
  tag = 'div',
  { classNames, attributes, styles, events } = {},
  ...children //rest
) {
  const elem = document.createElement(tag);
  if (classNames) {
    elem.classList.add(...classNames);
  }
  if (attributes) {
    for (const [nameAttr, valueAttr] of Object.entries(attributes)) {
      elem.setAttribute(nameAttr, valueAttr);
    }
  }
  if (styles) {
    for (const [nameStyle, valueStyle] of Object.entries(styles)) {
      elem.style[nameStyle] = valueStyle;
    }
  }
  if (events) {
    for (const [nameEvent, valueEvent] of Object.entries(events)) {
      elem.addEventListener(nameEvent, valueEvent);
    }
  }
  if (children) {
    elem.append(...children);//spred
  } 
  return elem;
}

/**
 * 
 * @param {symbol} name 
 * @returns {symbol}
 */
function getInitials(name) {
  if (typeof(name) === 'string') {
    return name
      .trim()
      .split(" ")
      .map((elem) => elem[0])
      .join("")
      .toLocaleUpperCase();
  } else {
     throw new TypeError("must be string"); 
   }
}
 
/**
 *
 * @param {object} event.currentTarget
 */
function checkingPresenceChooseName(currentTarget) {
  const pChoose = document.querySelectorAll(".actor-name-choose");
  for (const p of pChoose) {
    if (currentTarget.children[0].children[1].innerText === p.innerText) {
      return;
    }
  }
  createNameChooseActor(currentTarget);
}
