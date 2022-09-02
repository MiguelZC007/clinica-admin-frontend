import { useGlobalContext } from '@/contexts/MainContext'
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp'
import DeleteForeverSharp from '@mui/icons-material/DeleteForeverSharp'
import EditSharp from '@mui/icons-material/EditSharp'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import { CategoryServices } from '../categories/category.service'
import { CategoryDto } from '../categories/dto/category.dto'
import { ProductDto } from './dto/product.dto'
import { ProductModel } from './product.model'
import { ProductServices } from './product.service'

export default function CategoryPage() {
  const INITIAL_PRODUCT = useMemo(() => new ProductModel().getProductDto(), [])

  const [products, setProducts] = useState<ProductDto[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [edit, setEdit] = useState(false)
  const [totalProducts, setTotalProducts] = useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const { setLoading, showNotify, showConfirmation } = useGlobalContext()

  // Get all products
  useEffect(() => {
    ProductServices.findAllProducts()
      .then(result => {
        setProducts(result)
        setTotalProducts(result.length)
      })
      .catch(err => showNotify(err))
  }, [])

  const productList = () => {
    return products.slice(page * rowsPerPage, rowsPerPage * (page + 1))
  }

  useEffect(() => {
    CategoryServices.findAllCategories()
      .then(result => setCategories(result))
      .catch(err => showNotify(err))
  }, [])

  const clearProduct = () => {
    setProduct(new ProductModel().getProduct())
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    if (edit) {
      const model = new ProductModel()
      model.setProduct(product)
      ProductServices.updateProduct(model.getCreateProduct(), product.id)
        .then(resp => {
          setProducts(preview =>
            preview.map(p => {
              if (p.id === resp.id) {
                return resp
              } else {
                return p
              }
            })
          )
          clearProduct()
          setEdit(false)
          showNotify('Edit Successfully')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    } else {
      ProductServices.createProduct(product)
        .then(resp => {
          setProducts(prev => [resp, ...prev])
          clearProduct()
          showNotify('Saved Successfully')
        })
        .catch(err => showNotify(err))
        .finally(() => setLoading(false))
    }
  }

  const handleEditButton = (product: ProductDto) => {
    setEdit(true)
    setProduct(product)
  }

  const handleDeleteButton = (id: string | null | undefined) => {
    if (!id) return

    showConfirmation(
      'Delete Product',
      'Are you sure you want to delete the Product?',
      () => {
        setLoading(true)
        ProductServices.deleteProduct(id)
          .then(resp => {
            const newProducts = products.filter(
              product => product.id !== resp.id
            )
            setProducts(newProducts)
            showNotify('Delete Successfully')
          })
          .catch(err => showNotify(err))
          .finally(() => setLoading(false))
      }
    )
  }

  const getCategoryName = (categoryId: string) => {
    const [category] = categories.filter(category => category.id === categoryId)
    return category.name
  }

  const searchOptions = products.map(product => {
    return {
      id: product.id,
      name: product.name
    }
  })

  const handleSearchChange = (
    event: React.SyntheticEvent,
    value: {
      name: string | null | undefined
      id: string | null | undefined
    } | null
  ) => {
    if (value?.id) {
      const [productSearch] = products.filter(
        product => product.id === value.id
      )

      setProduct(productSearch)
      setEdit(true)
    } else {
      setProduct(INITIAL_PRODUCT)
    }
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Products
      </Typography>

      {/* Start Search Autocomplete */}
      <Grid container marginY={5} justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Autocomplete
            disablePortal
            id="combo-box-categories"
            options={searchOptions}
            getOptionLabel={option => option.name}
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
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              name="name"
              label="Name"
              value={product.name}
              onChange={event =>
                setProduct(prev => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="number"
              name="price"
              label="Price"
              value={product.price}
              onChange={event =>
                setProduct(prev => ({
                  ...prev,
                  price: Number(event.target.value)
                }))
              }
              // required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.state}
                    onChange={event =>
                      setProduct(prev => ({
                        ...prev,
                        state: event.target.checked
                      }))
                    }
                  />
                }
                label="State"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              value={product.description}
              onChange={event =>
                setProduct(prev => ({
                  ...prev,
                  description: event.target.value
                }))
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="sub_category"
              label="Sub-Category"
              value={product.sub_category}
              onChange={event =>
                setProduct(prev => ({
                  ...prev,
                  sub_category: event.target.value
                }))
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.programmable}
                    onChange={event =>
                      setProduct(prev => ({
                        ...prev,
                        programmable: event.target.checked
                      }))
                    }
                  />
                }
                label="Programmable"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl>
              <InputLabel id="categories-label">Categories</InputLabel>
              <Select
                labelId="categories-label"
                id="categories-select"
                value={product.category_id}
                label="Categories"
                onChange={event =>
                  setProduct(prev => ({
                    ...prev,
                    category_id: event.target.value
                  }))
                }
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Button
                type="submit"
                color={edit ? 'secondary' : 'primary'}
                fullWidth={false}
                sx={{ marginRight: '24px' }}
              >
                {edit ? 'Edit' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                onClick={clearProduct}
                fullWidth={false}
              >
                Clear
              </Button>
            </Box>
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
                <TableCell align="left">Price</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Programmable</TableCell>
                <TableCell align="left">Sub-Category</TableCell>
                <TableCell align="left">Category Id</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList().map(product => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">
                    {product.state === true ? (
                      <CheckCircleOutlineSharpIcon color="success" />
                    ) : (
                      <HighlightOffSharpIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">
                    {product.programmable === true ? (
                      <CheckCircleOutlineSharpIcon color="success" />
                    ) : (
                      <HighlightOffSharpIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="left">{product.sub_category}</TableCell>
                  <TableCell align="left">
                    {getCategoryName(product.category_id)}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditButton(product)}
                      >
                        <EditSharp color="primary" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteButton(product.id)}
                      >
                        <DeleteForeverSharp color="error" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Start Pagination */}
        <TablePagination
          component="div"
          count={totalProducts}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* Start Pagination */}
      </Box>
      {/* End Table */}
    </Container>
  )
}
