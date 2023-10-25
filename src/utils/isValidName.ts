//Имя должно начинаться с заглавной буквы, содержать 2-30 символов, без пробелов
export function isValidName(name: string): boolean {
  return /^[A-ZА-Я][а-яА-ЯёЁa-zA-Z0-9]{1,30}$/.test(name)
}
