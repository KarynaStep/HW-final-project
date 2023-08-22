"use strict";

fetch("./assetes/js/data.json")
  .then((response) => response.json())
  .then((actors) => {
    const verifiedActors = actors.filter(
      (element) => element.firstName.trim() && element.lastName.trim()
    );

    const createActor = verifiedActors.map((actor) => createActorItem(actor));
    root.append(...createActor);
    
  })
  .catch((error) => {
    const textError = createElement(
      "h3",
      { classNames: ["error"] },
      `Data not received. Try again.
      ${error}`
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

  const li = createElement(
    "li",
    {
      classNames: ["actor-card"],
      events: {
        click: ({currentTarget}) => {
          checkingPresenceChooseName(currentTarget)
        },
      },
    },
    article
  );
  return li;
}


/**
 *
 * @param {object} 
 */
function createNameChooseActor(currentTarget) {
  const nameActor = createElement(
    "p",
    { classNames: ["actor-name-choose"] },
    currentTarget.children[0].children[1].innerText
  );
  const crossNameActor = createElement("img", {
    classNames: ["img-cross"],
    attributes: {
      src: "./assetes/icons/cross.svg",
    },
    events: {
      click: ({ target }) => {
        target.parentNode.remove();
      },
    },
  });
  const li = createElement(
    "li",
    { classNames: ["li-like-actor"] },
    nameActor,
    crossNameActor
  );
  choose.append(li);
}