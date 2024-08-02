let formData: { title: string; options: string[]; image: string } | null = null;

export function saveFormData(data: {
  title: string;
  options: string[];
  image: string;
}) {
  formData = data;
}

export function getFormData() {
  return formData || { title: "", options: ["", ""], image: "" };
}

export const state = {
  option1Count: 0,
  option2Count: 0,
};

export function incrementOption1() {
  state.option1Count += 1;
}

export function incrementOption2() {
  state.option2Count += 1;
}

export function getState() {
  return state;
}
