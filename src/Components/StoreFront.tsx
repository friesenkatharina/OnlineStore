import React, { useState } from "react";
import { CartSearchField } from "../Components/CartSearchField";
import { StoreItem } from "../Components/StoreItem";
import items from "../items.json";

const StoreFront = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems =
    searchTerm.trim() !== ""
      ? items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div>
      <CartSearchField
        onSearchTermChange={(term: string) => setSearchTerm(term)}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredItems.length > 0
          ? filteredItems.map((item) => (
              <StoreItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imgUrl={item.imgUrl}
              />
            ))
          : searchTerm.trim() !== "" && <div>Keine Artikel gefunden.</div>}
      </div>
    </div>
  );
};

export default StoreFront;
