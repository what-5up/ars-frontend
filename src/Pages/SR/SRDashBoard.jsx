import React from "react";
import AccountTypesPage from "../../Containers/SR/AccountTypesPage";
import FrontPage from "../../Containers/SR/FrontPage";
import TicketPrices from "../../Containers/SR/TicketPrices";

const SRDashBoard = () => {
  return (
    <>
      <FrontPage />
      <TicketPrices/>
      <AccountTypesPage/>
    </>
  );
};

export default SRDashBoard;
