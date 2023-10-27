const placeSchema = require("../models/place.model.js");
const { uploadFile } = require("../helpers/s3.js");
const { catchedAsync, response } = require("../helpers");

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

  await place.save().then((data) => response(res, 200, data));
};

// const getPlaces = async (req, res) => {
//   await placeSchema
//     .find()
//     .then((data) => response(res, 200, data))
//     .catch((err) => validateError(err));
// };

const getPlacesByUser = async (req, res) => {
  await placeSchema
    .find({ users_id: req.params.id })
    .then((data) => response(res, 200, data));
};

const getPlace = async (req, res) => {
  await placeSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data));
};

const getPlaceAboutUs = async (req, res) => {
  await placeSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data.about_us));
};

const getPlaceContactUs = async (req, res) => {
  await placeSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data.contact_us));
};

const getPlaceCustoms = async (req, res) => {
  await placeSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data.customs));
};

// const postPlace = async (req, res) => {
//   // if (req.file) {
//   //   const { filename } = req.file;
//   //   place.setImgUrl(filename);
//   // }
//   // console.log(req.files.imgs)
//   // const imgs = req.files.imgs

//   // const result = await uploadFile('app-menu', imgs)

//   // res.send(result)

//   const place = placeSchema(req.body);
//   await place
//     .save()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.json({ message: err }));
// };

const postPlaceStepHome = async (req, res) => {
  dataPlace = req.body;
  const place = placeSchema(dataPlace);
  await place.save().then((data) => response(res, 200, data));
};

const postPlaceStepAboutUs = async (req, res) => {
  const data = req.body;

  const dataModified = { about_us: data };

  const place = await placeSchema.findByIdAndUpdate(
    req.params.id,
    dataModified
  );
  await place.save().then((data) => response(res, 200, data));
};

const postPlaceStepContactUs = async (req, res) => {
  const data = req.body;

  const dataModified = { contact_us: data };

  const place = await placeSchema.findByIdAndUpdate(
    req.params.id,
    dataModified
  );
  await place.save().then((data) => response(res, 200, data));
};

const postPlaceStepCustoms = async (req, res) => {
  const data = req.body;

  const dataModified = { customs: data };

  const place = await placeSchema.findByIdAndUpdate(
    req.params.id,
    dataModified
  );
  await place.save().then((data) => response(res, 200, data));
};

const updatePlaceStepHome = async (req, res) => {
  const data = req.body;
  const place = await placeSchema.findByIdAndUpdate(req.params.id, data);
  await place.save().then((data) => response(res, 200, data));
};

const updatePlaceStepAboutUs = async (req, res) => {
  const data = { about_us: req.body };
  const place = await placeSchema.findByIdAndUpdate(req.params.id, data);
  await place.save().then((data) => response(res, 200, data));
};

const updatePlaceStepContactUs = async (req, res) => {
  const data = { contact_us: req.body };
  const place = await placeSchema.findByIdAndUpdate(req.params.id, data);
  await place.save().then((data) => response(res, 200, data));
};

const updatePlaceStepCustoms = async (req, res) => {
  const data = { customs: req.body };
  const place = await placeSchema.findByIdAndUpdate(req.params.id, data);
  await place.save().then((data) => response(res, 200, data));
};

const deletePlace = async (req, res) => {
  await placeSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => response(res, 200, data));
};

// const updatePlace = async (req, res) => {
//   const place = await placeSchema.findByIdAndUpdate(req.params.id, req.body);
//   await place
//     .save()
//     .then((data) => response(res, 200, data))
//     .catch((err) => validateError(err));
// };

const updateDefaultLang = async (req, res) => {
  if (!req.body.dflt_lang)
    return res.json({ message: "No se ha enviado el lenguaje por defecto" });
  if (!req.params.id)
    return res.json({ message: "No se ha enviado el id del lugar" });

  const place = await placeSchema.findById(req.params.id);
  place.dflt_lang = req.body.dflt_lang;
  await place.save().then((data) => response(res, 200, data));
};

module.exports = {
  updateTheme: catchedAsync(updateTheme),
  getPlacesByUser: catchedAsync(getPlacesByUser),
  getPlace: catchedAsync(getPlace),
  getPlaceAboutUs: catchedAsync(getPlaceAboutUs),
  getPlaceContactUs: catchedAsync(getPlaceContactUs),
  getPlaceCustoms: catchedAsync(getPlaceCustoms),
  postPlaceStepHome: catchedAsync(postPlaceStepHome),
  postPlaceStepAboutUs: catchedAsync(postPlaceStepAboutUs),
  postPlaceStepContactUs: catchedAsync(postPlaceStepContactUs),
  postPlaceStepCustoms: catchedAsync(postPlaceStepCustoms),
  updatePlaceStepHome: catchedAsync(updatePlaceStepHome),
  updatePlaceStepAboutUs: catchedAsync(updatePlaceStepAboutUs),
  updatePlaceStepContactUs: catchedAsync(updatePlaceStepContactUs),
  updatePlaceStepCustoms: catchedAsync(updatePlaceStepCustoms),
  deletePlace: catchedAsync(deletePlace),
  updateDefaultLang: catchedAsync(updateDefaultLang),
};
