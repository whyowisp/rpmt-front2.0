import { useDispatch, useSelector } from 'react-redux'
import {
  Input,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { editCovenant } from '../../../reducers/covenantReducer'
import { commonBoxSx, plainInputSx, okButton } from '../../themeAndStyles'

const MundaneBooks = ({ id }) => {
  const dispatch = useDispatch()
  const covenant = useSelector((state) =>
    state.covenants.find((c) => c.id === id)
  )

  const [books, setBooks] = useState()
  const [fieldIndex, setFieldIndex] = useState(-1)

  useEffect(() => {
    setBooks(covenant.mundaneBooks.concat(['']))
  }, [covenant])

  const prepareValues = (e, type) => {
    e.preventDefault()
    const newValue = e.target.value
    const indexOfNewValue = fieldIndex

    console.log(
      'newValue: ' + newValue + ', at index: ' + fieldIndex + ', type: ' + type
    )
    /* eslint-disable */
    setBooks(
      books.map((book, i) =>
        i === indexOfNewValue
          ? {
              book: type === 'book' ? newValue : book.book,
              author: type === 'author' ? newValue : book.author,
              year: type === 'year' ? newValue : book.year,

              bookType: type === 'bookType' ? newValue : book.bookType,
              ability: type === 'ability' ? newValue : book.ability,
              level: type === 'level' ? newValue : book.level,
              quality: type === 'quality' ? newValue : book.quality,
              notes: type === 'notes' ? newValue : book.notes,
            }
          : book
      )
    )
    /* eslint-enable */
  }

  const submitUpdate = (e) => {
    e.preventDefault()

    //Clear book objects that doesn't have book book
    const booksEmptyValuesCleared = books.filter((book) =>
      Object.values(book)[0] === '' ? null : book
    )

    console.log(
      'array of empty values cleared(?): ' +
        JSON.stringify(booksEmptyValuesCleared)
    )

    const data = {
      id: id,
      content: {
        mundaneBooks: booksEmptyValuesCleared,
      },
    }

    //console.log('data to send: ' + JSON.stringify(data))
    dispatch(editCovenant(data))

    //Re-render will clear these anyway
    setFieldIndex(-1)
    setBooks([])
    // -> to rerender
  }

  if (!books) return null

  return (
    <TableContainer component="form" sx={{ ...commonBoxSx }}>
      <Typography variant="label">Mundane Books</Typography>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                borderBottom: 'none',
              }}
              sx={{ display: { xs: 'none', sm: 'table-cell' } }}
            ></TableCell>
            <TableCell
              sx={{ width: '12%', display: { xs: 'none', sm: 'table-cell' } }}
            >
              Author / Scribe
            </TableCell>
            <TableCell
              sx={{ width: '8%', display: { xs: 'none', sm: 'table-cell' } }}
            >
              Year
            </TableCell>
            <TableCell sx={{ width: '10%' }}>Type</TableCell>
            <TableCell sx={{ width: '13%' }}>Ability</TableCell>
            <TableCell sx={{ width: '5%' }}>Level</TableCell>
            <TableCell sx={{ width: '6%' }}>Quality</TableCell>
            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
              Notes
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((book, index) => (
            <TableRow key={book + index} sx={{ border: 'none' }}>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{
                    ...plainInputSx,
                    width: '95%',
                  }}
                  defaultValue={book.book}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'book')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.author}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'author')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.year}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'year')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.bookType}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'bookType')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.ability}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'ability')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.level}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'level')}
                />
              </TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Input
                  sx={{ ...plainInputSx, width: '95%' }}
                  defaultValue={book.quality}
                  onChange={() => setFieldIndex(index)}
                  onBlur={(event) => prepareValues(event, 'quality')}
                />
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                <i>
                  <Input
                    sx={{ ...plainInputSx, width: '95%' }}
                    defaultValue={book.notes}
                    onChange={() => setFieldIndex(index)}
                    onBlur={(event) => prepareValues(event, 'notes')}
                  />
                </i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={okButton} onClick={(e) => submitUpdate(e)}>
        ok
      </Button>
    </TableContainer>
  )
}

export default MundaneBooks
