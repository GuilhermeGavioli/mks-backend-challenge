
import { z } from 'zod';

const allowedUsernameChars = /^[a-zA-Z0-9]+$/
const allowedPasswordChars = /^[a-zA-Z0-9]+$/u

export const userSchema = z.object({
  username: z
  .string()
    .regex(allowedUsernameChars, 'Username must only contain alphanumerical chars.'),
  password: z
  .string()
  .min(6)
  .max(50)
});

const allowedTitleAndDescriptionChars = /^[a-zA-Z0-9\s\-)(ç.:,]+$/u;
const allowedGenreAnDirectorChars = /^[a-zA-Z.]+$/u;
export const createMovieSchema = z.object({
  title: z
    .string()
    .regex(allowedTitleAndDescriptionChars, 'Title can only contain alphanumeric characters, spaces, hyphens, parentheses, and commas'),
  description: z
    .string()
    .regex(allowedTitleAndDescriptionChars, 'Description can only contain alphanumeric characters, spaces, hyphens, parentheses, and commas'),
  year: z
    .number()
    .refine((value) => {
      const parsedYear = Number(value);
      if (isNaN(parsedYear) || parsedYear < 1895 || parsedYear > 2025) {
        return false
      }
      return parsedYear;
    }, {message: 'According to Google the first movie ever created was in 1895. Year must be a number between 1895 and 2025 (to be released)'}),
  genre: z
      .string()
      .regex(allowedGenreAnDirectorChars, 'Genre must be  a-z A-Z only.'),
  director: z
      .string()
      .regex(allowedGenreAnDirectorChars, 'Director must be  a-z A-Z only.'),
  rated: z.enum(['G', 'PG', 'PG-13', "NC-17", "R"], { message: 'Rated field must be  "G", "PG", "PG-13","NC-17" or "R"' }),
}, {message: 'Year must be a number between 1920 and 2025'});


export const updateMovieSchema = z.object({
  title: z
    .string()
    .regex(allowedTitleAndDescriptionChars, 'Title can only contain alphanumeric characters, spaces, hyphens, parentheses, and commas')
    .optional(),
  description: z
    .string()
    .regex(allowedTitleAndDescriptionChars, 'Description can only contain alphanumeric characters, spaces, hyphens, parentheses, and commas')
    .optional(),
  year: z
    .number()
    .refine((value) => {
      const parsedYear = Number(value);
      if (isNaN(parsedYear) || parsedYear < 1895 || parsedYear > 2025) {
        return false
      }
      return parsedYear;
    }, {message: 'According to Google the first movie ever created was in 1895. Year must be a number between 1895 and 2025 (to be released)'})
    .optional(),
  genre: z
      .string()
      .regex(allowedGenreAnDirectorChars, 'Genre must be  a-z A-Z only.')
      .optional(),
  director: z
      .string()
      .regex(allowedGenreAnDirectorChars, 'Director must be  a-z A-Z only.')
      .optional(),
  rated: z
    .enum(['G', 'PG', 'PG-13', "NC-17", "R"], { message: 'Rated field must be  "G", "PG", "PG-13","NC-17" or "R"' })
    .optional(),
}, {message: 'Year must be a number between 1920 and 2025'});



export const IDsSchema = z.string()
  .refine((value) => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 10000) {
        return false
    }
    return value;
  }, {message: 'Provided ID is Invalid. It must be a number'});


export const pageSchema = z
.string()
.refine((value) => {
  const parsedValue = Number(value);
  if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 1000) {
      return false
  }
  return value;
}, {message: 'Provided Page is Invalid.'});

export const movieAttributeSchema = z.string().refine((value): boolean => {
    const allowedMoviesAttributes = ['title', 'description', 'year', 'genre', 'director', 'rated'];
    return allowedMoviesAttributes.includes(value)
}, { message: 'Not a valid Movie attribute field.' })

