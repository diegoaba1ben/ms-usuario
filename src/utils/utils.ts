export function isValidColombianDateFormat(dateString: string): boolean {
  // Expresión regular para el formato DD-MM-YYYY
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return dateRegex.test(dateString);
}
