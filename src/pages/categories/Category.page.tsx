import { useGlobalContext } from '@/contexts/MainContext'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import { CategoryModel } from './category.model'
import { CategoryServices } from './category.service'
import { CategoryDto } from './dto/category.dto'

export default function CategoryPage() {
  const INITIAL_CATEGORY = useMemo(
    () => new CategoryModel().getCategoryDto(),
    []
  )
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [category, setCategory] = useState<CategoryDto>(INITIAL_CATEGORY)
  const [edit, setEdit] = useState(false)
  const { setLoading, showNotify } = useGlobalContext()

  useEffect(() => {
    CategoryServices.findAllCategories()
      .then(result => {
        setCategories(result)
      })
      .catch(err => showNotify(err))
  }, [])

  const clear = () => {
    setCategory(INITIAL_CATEGORY)
  }

  const handleChangeCategory = (e: string | any) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeCheckbox = (e: string | any) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.checked
    })
  }

  const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (edit) {
      CategoryServices.updateCategory(category, category.id)
        .then(resp => {
          setCategories(preview =>
            preview.map(p => {
              if (p.id === category.id) {
                return resp
              }
              return p
            })
          )
          clear()
          setEdit(false)
          showNotify('Editado correctamente')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    } else {
      CategoryServices.createCategoryDto(category)
        .then(resp => {
          setCategories(previo => [resp, ...previo])
          clear()
          showNotify('Guardado correctamente')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    }
  }

  const handleEditButton = (category: CategoryDto) => {
    setEdit(true)
    setCategory(category)
  }

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Categories
      </Typography>

      {/* Input Search */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Category Name"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {/* Start Form */}
      <Box marginY={5}>
        {/* {console.log(category?.id)} */}
        <form onSubmit={handleSubmitPost} autoComplete="off">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={4}>
              <TextField
                name="name"
                label="Category name"
                value={category.name}
                onChange={handleChangeCategory}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="description"
                label="Description of the category"
                placeholder="Placeholder"
                multiline
                rows={4}
                value={category.description}
                onChange={handleChangeCategory}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={<Checkbox name="state" checked={category.state} />}
                label="State"
                onChange={handleChangeCheckbox}
              />
            </Grid>

            <Grid item>
              <Button type="submit" color={edit ? 'secondary' : 'primary'}>
                {edit ? 'Edit' : 'Save'}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={clear}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* End Form */}

      {/* Start Table */}
      <Box sx={{ marginTop: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => (
                <TableRow
                  key={category.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="left">{category.description}</TableCell>
                  <TableCell align="left">
                    {category.state === true ? (
                      <CheckCircleOutlineSharpIcon color="success" />
                    ) : (
                      <HighlightOffSharpIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      value={`${category.id}`}
                      onClick={() => handleEditButton(category)}
                      fullWidth={false}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* End Table */}
    </Container>
  )
}
