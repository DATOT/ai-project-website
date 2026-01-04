export type ChatOptionType = "toggle" | "radio" | "button"; // add more types later

export class ChatOption {
  id: string;
  label: string;
  icon?: React.ReactNode;

  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;

  type: ChatOptionType;
  active: boolean;
  section?: number; // 0-indexed section

  onClick: () => void;

  constructor(params: {
    id: string;
    label: string;
    icon?: React.ReactNode;

    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;

    type?: ChatOptionType;
    active?: boolean;
    section?: number;

    onClick: () => void;
  }) {
    this.id = params.id;
    this.label = params.label;
    this.icon = params.icon;

    this.borderColor = params.borderColor;
    this.backgroundColor = params.backgroundColor;
    this.textColor = params.textColor;

    this.type = params.type ?? "button";
    this.active = params.active ?? false;
    this.section = params.section;

    this.onClick = params.onClick;
  }

  toggle() {
    if (this.type === "toggle") {
      this.active = !this.active;
    }
  }

  trigger(optionsInSection?: ChatOption[]) {
    if (this.type === "toggle") {
      this.toggle();
    } else if (this.type === "radio" && optionsInSection) {
      // deactivate all in the same section
      optionsInSection.forEach((opt) => (opt.active = false));
      this.active = true;
    }

    this.onClick();
  }

  get buttonClass() {
    return [
      "btn btn-outline flex items-center gap-1 transition-transform transition-opacity duration-200 hover:scale-105 active:scale-95 rounded-full",
      "border",
      (this.type === "toggle" || this.type === "radio") && this.active && "ring ring-offset-1",
    ]
      .filter(Boolean)
      .join(" ");
  }

  get style(): React.CSSProperties {
    return {
      borderColor: this.borderColor,
      backgroundColor: this.active
        ? this.backgroundColor
        : "transparent",
      color: this.textColor,
    };
  }
}
