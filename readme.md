# Example Use Case

install it with yarn or npm

> yarn add auto-complete-dropdown

or

> npm i auto-complete-dropdown

import it,

> import { AutoCompleteDropdown } from "auto-complete-dropdown";

and use it,

    <AutoCompleteDropdown
       {...TextInput props}

       compareKey="name"
       data={[{ name: "Karen" }, { name: "Harry" }]}
       onSelected={(selectedItem) => console.warn(selectedItem.name)}

       placeholder= ""
       textInputStyle={{}}
       wrapperViewStyle={{}}
       listItemTextStyle={{}}
       listItemViewStyle={{}}
    />

![Search bar](/images/one.png) ![Search bar with dropdown](/images/two.png)
