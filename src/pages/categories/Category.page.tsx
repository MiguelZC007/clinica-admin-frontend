import { useGlobalContext } from '@/contexts/MainContext'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp'
import DeleteForeverSharp from '@mui/icons-material/DeleteForeverSharp'
import EditSharp from '@mui/icons-material/EditSharp'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
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
  const { setLoading, showNotify, showConfirmation } = useGlobalContext()

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

  const handleChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.checked
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          showNotify('Edit Successfully')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    } else {
      CategoryServices.createCategoryDto(category)
        .then(resp => {
          setCategories(previo => [resp, ...previo])
          clear()
          showNotify('Saved Successfully')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    }
  }

  const handleEditButton = (category: CategoryDto) => {
    setEdit(true)
    setCategory(category)
  }

  const handleDeleteButton = (id: string | null | undefined) => {
    if (!id) return
    showConfirmation(
      'Delete Category',
      'Are you sure you want to delete the category?',
      () => {
        CategoryServices.deleteCategory(id)
          .then(resp => {
            const newCategories = categories.filter(
              categoria => categoria.id !== resp.id
            )
            setCategories(newCategories)
            showNotify('Removing Successfully')
          })
          .catch(err => showNotify(err))
          .finally(() => setLoading(false))
      }
    )
  }

  const searchOptions = categories.map(category => {
    return {
      label: category.name,
      id: category.id
    }
  })

  const handleSearchChange = (
    event: React.SyntheticEvent,
    value: {
      label: string | null | undefined
      id: string | null | undefined
    } | null
  ) => {
    if (value?.id) {
      const [categorySearch] = categories.filter(
        category => category.id === value.id
      )

      setCategory(categorySearch)
      setEdit(true)
    } else {
      setCategory(INITIAL_CATEGORY)
    }
  }

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Categories
      </Typography>

      {/* Start Search Autocomplete */}
      <Grid container marginY={5} justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            disablePortal
            id="combo-box-categories"
            options={searchOptions}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onChange={(event, value) => {
              handleSearchChange(event, value)
            }}
            renderInput={params => (
              <TextField {...params} label="Filter by Category Name" />
            )}
          />
        </Grid>
      </Grid>
      {/* End Search Autocomplete */}

      {/* Start Form */}
      <Box
        marginY={5}
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
              multiline
              rows={4}
              value={category.description}
              onChange={handleChangeCategory}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="state"
                  checked={category.state}
                  onChange={handleChangeCheckbox}
                />
              }
              label="State"
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
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditButton(category)}
                    >
                      <EditSharp color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteButton(category.id)}
                    >
                      <DeleteForeverSharp color="error" />
                    </IconButton>
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
