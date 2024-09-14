const generateShortId = require("ssid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortId = generateShortId(5);
  const urlRep = await findLinkRepetion(body);
  if (urlRep) {
    return res.json({ id: urlRep.shortId });
  }
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    createdBy: req.user.email,
    visitedHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function findLinkRepetion(body) {
  const urlRep = await URL.findOne({ redirectURL: body.url });
  return urlRep;
}

module.exports = { handleGenerateNewShortURL, handleAnalytics };
