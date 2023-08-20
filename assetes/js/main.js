"use strict";
const socials = new Map();
socials.set(
  "www.facebook.com",
  "http://127.0.0.1:5500/assetes/icons/facebook_icon.svg"
);
socials.set(
  "twitter.com",
  "http://127.0.0.1:5500/assetes/icons/twitter_icon.svg"
);
socials.set(
  "www.instagram.com",
  "http://127.0.0.1:5500/assetes/icons/instagram_icon.svg"
);


fetch("http://127.0.0.1:5500/assetes/js/data.json")
  .then((response) => response.json())
  .then((actors) => {
    const verifiedActors = actors.filter(
      (element) => element.firstName.trim() && element.lastName.trim()
    );

    const createActor = verifiedActors.map((actor) => createActorItem(actor));
    root.append(...createActor);

    for (const item of createActor) {
      item.addEventListener(
        "click",
        ({ target }) => {
          target.localName === "ul"
            ? false
            : createNameLikeActor(target);
        },
        { once: true }
      );
    }
  })
  .catch((error) => {
    const textError = createElement(
      "p",
      { classNames: ["error"] },
      "Data not received. Try again. " + error
    );
    root.append(textError);
  });


/**
 * 
 * @param {object} actor 
 * @returns 
 */
function createActorItem({ firstName, lastName, profilePicture, contacts }) {
  const link = contacts.map((contact) => {
    const img = createElement("img", {
      classNames: ["link-socials"],
      attributes: { src: socials.get(new URL(contact).hostname) },
    });
    return createElement("a", { attributes: { href: contact } }, img);
  });

  const divLink = createElement(
    "div",
    { classNames: ["div-link-socials"] },
    ...link
  );

  const h3 = createElement(
    "h3",
    { styles: { "text-align": "center" } },
    firstName + " " + lastName
  );

  const h4Initials = createElement(
    "h4",
    {
      classNames: ["actor-initials"],
      styles: { backgroundColor: stringToColour(h3.innerText) },
    },
    document.createTextNode(getInitials(h3.innerText))
  );

  const divPhoto = createElement(
    "div",
    { classNames: ["div-photo"] },
    h4Initials
  );

  const photo = createElement("img", {
    classNames: ["actor-photo"],
    attributes: { src: profilePicture, alt: h3.innerText },
    events: { load: handleImgLoad(divPhoto) },
  });

  const article = createElement("article", {}, divPhoto, h3, divLink);
  const li = createElement("li", { classNames: ["actor-card"] }, article);
  return li;
}

/**
 * 
 * @param {object} event.target
 */
function createNameLikeActor(target) {
  const nameActor = createElement("p", {}, getNameActor(target));
  const li = createElement("li", { classNames: ["li-like-actor"] }, nameActor);
  choose.append(li);
}

/**
 * 
 * @param {object} event.target
 */
function getNameActor(target) {
  if (target.localName === "article") {
    return target.children[1].innerText;
  }
  if (
    target.className === "actor-photo" ||
    target.className === "actor-initials"
  ) {
    return target.parentNode.parentNode.children[1].innerText;
  }
  if (
    target.className === "div-link-socials" ||
    target.className === "div-photo"
  ) {
    return target.parentNode.children[1].innerText;
  }
  if (target.className === "actor-card") {
    return target.firstChild.children[1].innerText;
  } else {
    return target.innerText;
  }
}
