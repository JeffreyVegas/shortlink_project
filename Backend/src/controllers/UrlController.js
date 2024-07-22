const Url = require("../models/Url");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorHander");
const validator = require("validator");
// const { nanoid } = require("nanoid");

exports.getUrls = catchAsyncError(async (req, res, next) => {
  const { id } = req.user;

  const urls = await Url.find({ user: id });

  res.status(200).json({
    success: true,
    urls,
  });
});

exports.createShortUrl = catchAsyncError(async (req, res, next) => {
  const { url, shortUrl, description } = req.body;

  if (!validator.isURL(url)) {
    return next(new ErrorHander("Invalid URL", 401));
  }

  // if (shortUrl) {
  //   if (!validator.isURL(shortUrl)) {
  //     return next(new ErrorHander("Invalid shortUrl", 401));
  //   }
  // }

  //seacrh shortUrl if exist
  const urlExist = await Url.findOne({ shortUrl });
  if (urlExist) {
    return next(new ErrorHander("this shortUrl already exist", 401));
  }

  const newUrl = await Url.create({
    url,
    shortUrl,
    description,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    url: newUrl,
    message: "url created successfuly!",
  });
});

exports.deleteShortUrl = catchAsyncError(async (req, res, next) => {
  const url = await Url.findOneAndDelete({ _id: req.params.id });
  if (!url) return next(new ErrorHander("Url no found", 404));

  res.status(200).json({
    success: true,
    message: "url delete Successfully",
    idurl: url._id,
  });
});

exports.getUrl = catchAsyncError(async (req, res, next) => {
  const { shorturl } = req.query;

  const url = await Url.findOne({ shortUrl: shorturl });

  if (!url) return next(new ErrorHander("this link don't exit", 401));

  res.status(200).json({
    success: true,
    url,
  });
});

exports.updateUrl = catchAsyncError(async (req, res, next) => {
  const { _id: id, url, shortUrl, description } = req.body;

  if (!validator.isURL(url)) {
    return next(new ErrorHander("Invalid URL", 401));
  }

  const prevUrl = await Url.findById(id);

  if (!prevUrl) return next(new ErrorHander("Url no found", 404));

  if (prevUrl.shortUrl !== shortUrl) {
    const urlExist = await Url.findOne({ shortUrl });
    if (urlExist) {
      return next(new ErrorHander("this shortUrl name already exist", 401));
    }
  }

  const urlUpdate = await Url.findOneAndUpdate(
    { _id: id },
    { url, shortUrl, description },
    { new: true }
  );

  if (!urlUpdate) return next(new ErrorHander("Url no found", 404));

  res.status(200).json({
    success: true,
    url: urlUpdate,
  });
});

exports.incrementClicks = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const url = await Url.findByIdAndUpdate(
    id,
    {
      $inc: { numberClicks: 1 },
    },
    { new: true }
  );

  if (!url) return next(new ErrorHander("Url no found", 404));

  res.status(200).json({
    success: true,
    url,
  });
});
