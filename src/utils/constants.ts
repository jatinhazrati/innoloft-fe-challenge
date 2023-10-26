import { EditorState } from "draft-js";

export const PRODUCT_ID = 6781;

export const INITIAL_PRODUCT_DETAILS = {
  title: "",
  descriptionEditor: EditorState.createEmpty(),
};

export const EDITOR_TOOLBAR_OPTIONS = {
  options: ["inline", "list", "textAlign", "history"],
  inline: {
    options: ["bold", "italic"],
  },
  list: {
    options: ["unordered", "ordered"],
  },
  textAlign: {
    options: ["left", "center", "right", "justify"],
  },
  history: {
    inDropdown: false,
  },
};
