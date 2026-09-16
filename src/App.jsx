src/
  App.jsx  (slim — only state + layout)
  lib/
    constants.js  <- FLAGS, COUNTRIES, VENDOR_COUNTRY
    data.js       <- INITIAL_PROFILES, VENDORS, MERCH, WALL
    helpers.js    <- waLink()
  components/
    layout/TopCountriesBar.jsx
    layout/Header.jsx
    auth/AgeGate.jsx
    shared/FilterBar.jsx
    shared/Modals.jsx (Profile, Merch, AddProfile, AddMerch)
    discover/ProfileCard.jsx
    discover/DiscoverGrid.jsx
    merch/MerchCard.jsx
    merch/MerchGrid.jsx
    wall/WallFeed.jsx
    inbox/InboxView.jsx
    admin/AdminView.jsx
