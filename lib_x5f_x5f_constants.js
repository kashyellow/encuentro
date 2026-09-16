export const FLAGS = {
  "All Countries":"🌎",
  Colombia:"🇨🇴",
  "Dominican Republic":"🇩🇴",
  Japan:"🇯🇵",
  Switzerland:"🇨🇭",
  Europe:"🇪🇺",
  Panama:"🇵🇦",
  Thailand:"🇹🇭",
  Brazil:"🇧🇷",
  "Costa Rica":"🇨🇷",
  Mexico:"🇲🇽",
  Venezuela:"🇻🇪",
  USA:"🇺🇸",
  "United States":"🇺🇸",
  Philippines:"🇵🇭"
};

export const VENDOR_COUNTRY = {
  v1: "Colombia", v2: "Japan", v3: "Switzerland", v4: "Panama",
  v5: "Brazil", v6: "Costa Rica", v7: "Mexico", v8: "Venezuela"
};

export const COUNTRIES = ["All Countries","Colombia","Dominican Republic","Japan","Switzerland","Europe","Panama","Thailand","Brazil","Costa Rica","Mexico","Venezuela","USA","Philippines"];

export const getFlag = (c) => FLAGS[c] || "🏳️";
