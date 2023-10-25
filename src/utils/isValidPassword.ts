//Пароль должен содержать 8-30 символов, без пробелов. Минимум 2 цифры и 3 заглавные буквы
export function isValidPassword(password: string): boolean {
	return /^(?=.*[A-Z].*[A-Z].*[A-Z].*$)(?=.*[\d].*[\d].*$)[A-Za-zа-яА-Я0-9\d]{8,30}$/.test(password);
}
