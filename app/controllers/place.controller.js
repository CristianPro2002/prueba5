const placeSchema = require("../models/place.model.js");
const { uploadFile } = require("../helpers/s3.js");
const createError = require("http-errors");

const updateTheme = async (req, res) => {
  const { theme } = req.body;
  const place = await placeSchema.findById(req.params.id);

  place.theme = theme;
  if (theme === "theme1") {
    place.navbar_web[0].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/voltear-el-telefono+1.svg";
    place.navbar_web[1].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/marcador+1.svg";
    place.navbar_web[2].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/reloj-tres+1.svg";
    place.navbar_menu[0].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/hogar+(1).png";
    place.navbar_menu[1].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/cuota.png";
    place.home.background_img =
      "https://app-menu.s3.eu-north-1.amazonaws.com/pruebabg.png";
    place.about_us.background_color = "#ffffff";
    place.logo =
      "https://app-menu.s3.eu-north-1.amazonaws.com/logo+sushi+1+(2).png";
  } else if (theme === "theme2") {
    place.navbar_web[0].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme2/PhoneIcon_theme_2.svg";
    place.navbar_web[1].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme2/MapIcon_theme_2.svg";
    place.navbar_web[2].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme2/ReserveIcon_theme_2.svg";
    place.navbar_menu[0].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/hogar+(1).png";
    place.navbar_menu[1].icon =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme1/cuota.png";
    place.home.background_img =
      "https://app-menu.s3.eu-north-1.amazonaws.com/delicioso-coctel-exotico+1.svg";
    place.about_us.background_color = "#222222";
    place.logo =
      "https://app-menu.s3.eu-north-1.amazonaws.com/Theme2/Logo_theme_2.svg";
  }

  await place
    .save()
    .then((data) => res.json(data))
    .catch((err) => next(createError(500, "Error updating place")));
};

const getPlaces = async (req, res) => {
  await placeSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getPlacesByUser = async (req, res, next) => {
  await placeSchema
    .find({ users_id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(createError(500, "Error getting places")));
};

const getPlace = async (req, res) => {
  await placeSchema
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const postPlace = async (req, res) => {
  // if (req.file) {
  //   const { filename } = req.file;
  //   place.setImgUrl(filename);
  // }
  // console.log(req.files.imgs)
  // const imgs = req.files.imgs

  // const result = await uploadFile('app-menu', imgs)

  // res.send(result)

  const place = placeSchema(req.body);
  await place
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const deletePlace = async (req, res) => {
  await placeSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updatePlace = async (req, res) => {
  const place = await placeSchema.findByIdAndUpdate(req.params.id, req.body);
  await place
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updateDefaultLang = async (req, res) => {
  if (!req.body.dflt_lang)
    return res.json({ message: "No se ha enviado el lenguaje por defecto" });
  if (!req.params.id)
    return res.json({ message: "No se ha enviado el id del lugar" });

  const place = await placeSchema.findById(req.params.id);
  place.dflt_lang = req.body.dflt_lang;
  await place
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

module.exports = {
  updateTheme,
  getPlaces,
  getPlacesByUser,
  getPlace,
  postPlace,
  deletePlace,
  updatePlace,
  updateDefaultLang,
};
