import { ColumnsView, type Columns } from "./columns";
import { InputView, type Input } from "./input";
import { NumberView, type Number } from "./number";
import { SelectView, type Select } from "./select";
import { TextareaView, type Textarea } from "./textarea";

export type Item = Columns | Input | Number | Select | Textarea;

export function ItemView(item: Item) {
  switch (item.type) {
    case "columns": {
      return <ColumnsView {...item} />;
    }
    case "input": {
      return <InputView {...item} />;
    }
    case "number": {
      return <NumberView {...item} />;
    }
    case "select": {
      return <SelectView {...item} />;
    }
    case "textarea": {
      return <TextareaView {...item} />;
    }
  }
}
