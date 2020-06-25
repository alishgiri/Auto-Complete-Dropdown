# Example Use Case

import it,

> import { AutoCompleteDropdown } from "auto-complete-dropdown";

and use it,

    <AutoCompleteDropdown
       {...TextInput props}

       compareKey="name"
       onSelected={(name) => console.warn(name)}
       data={[{ name: "Karen" }, { name: "Harry" }]}

       textInputStyle={{}}
       wrapperViewStyle={{}}
       listItemTextStyle={{}}
       listItemViewStyle={{}}
    />

![Search bar](/images/one.png) ![Search bar with dropdown](/images/two.png)
