import React from "react";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddNewLink from "./AddNewLink";
import LinksListFilter from "../ui/LinksListFilters";

export default () => {
    return (
            <div>
              <PrivateHeader title = "Your Links"/>
                <div className="page-content">
                    <LinksListFilter/>
                    <AddNewLink/>
                    <LinksList/>
                </div>
            </div>
        );
}