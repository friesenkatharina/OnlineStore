// CartSearchField.tsx
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

type CartSearchFieldProps = {
  onSearchTermChange: (term: string) => void;
};

export const CartSearchField = ({
  onSearchTermChange,
}: CartSearchFieldProps) => {
  return (
    <InputGroup className="mb-3" style={{ width: "150px" }}>
      <FormControl
        style={{ width: "200px" }}
        placeholder="Artikel suchen alphabetisch..."
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    </InputGroup>
  );
};
