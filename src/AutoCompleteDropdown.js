import {
  View,
  Text,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { UIManager } from "react-native";

class AutoCompleteDropdown extends React.Component {
  state = {
    keyword: "",
    suggestions: [],
    isVisible: false,
  };

  componentDidMount() {
    try {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.Presets.linear;
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(_, prevState) {
    const { keyword } = this.state;
    if (keyword !== prevState.keyword && keyword.trim() === "") {
      this.props.onSelected(null);
      this.setState({ suggestions: [] });
    }
  }

  onFilter = (key) => {
    this.setState({ keyword: key }, () => {
      if (this.state.keyword.length > 2) {
        const { keyword } = this.state;
        const { data, compareKey } = this.props;
        const suggestions = [
          ...data.filter((d) => {
            if (d[compareKey].toLowerCase().includes(keyword.toLowerCase()))
              return d;
          }),
        ];
        if (suggestions.length) {
          this.setState({ suggestions, isVisible: true });
        }
      }
    });
  };

  onSelectionMade = (item) => {
    this.setState({
      suggestions: [],
      isVisible: false,
      keyword: item[this.props.compareKey],
    });
    this.props.onSelected(item);
  };

  keyPressAction = () => {
    const { isVisible, keyword } = this.state;
    if (isVisible && keyword === "") {
      this.setState({ isVisible: false, suggestions: [] });
    }
  };

  render() {
    const {
      data,
      value,
      textInputStyle,
      wrapperViewStyle,
      listItemViewStyle,
      listItemTextStyle,
    } = this.props;
    const { isVisible, suggestions, keyword } = this.state;
    return !data ? (
      <ActivityIndicator />
    ) : (
      <View style={[styles.text_field_wrapper_view, wrapperViewStyle]}>
        <TextInput
          placeholder="Search…"
          selectTextOnFocus={true}
          onChangeText={this.onFilter}
          clearButtonMode="while-editing"
          onKeyPress={this.keyPressAction}
          value={keyword ? keyword : value}
          style={[styles.text_field(isVisible), textInputStyle]}
        />
        {isVisible && (
          <View style={styles.auto_complete_container}>
            {suggestions.map((item, i) => {
              return (
                <View key={i} style={[styles.list_item, listItemViewStyle]}>
                  <Text
                    onPress={() => this.onSelectionMade(item)}
                    style={[styles.item_label, listItemTextStyle]}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  text_field_wrapper_view: {
    margin: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 30,
    overflow: "hidden",
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  outer_view_text_field: {
    marginVertical: 0,
  },
  text_field: function (isVisible) {
    return {
      padding: 10,
      fontSize: 20,
      borderWidth: 0,
      textAlign: "left",
      marginVertical: 0,
      borderColor: "transparent",
      ...(isVisible ? { fontWeight: "bold" } : {}),
    };
  },
  auto_complete_container: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  list_item: {
    padding: 10,
    width: "100%",
    height: "auto",
    borderColor: "#ccc",
    borderTopWidth: 0.5,
  },
  item_label: {
    paddingVertical: 5,
  },
});

export { AutoCompleteDropdown };
