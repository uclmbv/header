import * as $ from "@uclmbv/dtls";
import { Config, Data, Constructor, CSS, UI, Level } from "./types";

import { allLevels } from "./utils";

class Header {
  /* required */
  static get icon() {
    return this.levels.map((item) => ({
      icon: item.icon,
      title: item.tag,
      data: { level: item.number },
    }));
  }

  /* optional */
  static get readOnly(): boolean {
    return true;
  }
  static get paste() {
    return { tags: ["h1", "h2", "h3", "h4", "h5", "h6"] };
  }
  static get sanitize() {
    return {
      level: false,
      text: {},
    };
  }
  static get convert() {
    return { export: "text", import: "text" };
  }

  /* custom */
  api;
  readOnly: boolean;
  private config: Config;
  private data: Data;
  private CSS: CSS;
  private ui: UI;

  /* contructor */
  constructor({ api, config, data, readOnly }: Constructor) {
    this.api = api;
    this.readOnly = readOnly;

    // config와 data의 경우 normalize가 필요한 경우가 있음
    this.config = {
      placeholder: config.placeholder,
      levels: config.levels,
      defaultLevel: config.defaultLevel,
    };
    this.data = { text: data.text, level: data.level };

    this.CSS = {
      block: this.api.styles.block,
      container: "ce-header",
    };
    this.ui = this.createUI();
  }
  get levels(): Level[] {
    return this.config.levels
      ? allLevels.filter((item) => this.config.levels?.includes(item.number))
      : allLevels;
  }
  get defaultLevel(): Level {
    if (this.config.defaultLevel) {
      const customDefault = this.levels.find((item) => {
        return item.number === this.config.defaultLevel;
      });

      if (customDefault) {
        return customDefault;
      } else {
        console.warn("The specified value was not found in available levels.");
      }
    }
    return this.levels[0];
  }
  get currentLevel(): Level {
    let level = this.levels.find((item) => item.number === this.data.level);
    if (!level) {
      level = this.defaultLevel;
    }
    return level;
  }

  createUI(): UI {
    const container = $.make(
      this.currentLevel.tag,
      [this.CSS.block, this.CSS.container],
      {
        contentEditable: this.readOnly ? "false" : "true",
        innerHTML: this.data.text || "",
      }
    );
    container.dataset.placeholder = this.api.i18n.t(
      this.config.placeholder || ""
    );

    return container;
  }

  /* required */
  public render(): UI {
    return this.ui;
  }
  public save(blockContent: UI): Data {
    return { text: blockContent.innerHTML, level: this.currentLevel.number };
  }

  /* optional 
  public validate(savedData) {}
  public onPaste(event) {}
  public merge(data) {}
  public destroy() {}
  */

  /* custom */
}
export default Header;
