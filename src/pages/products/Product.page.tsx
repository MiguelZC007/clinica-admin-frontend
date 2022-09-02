import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { ProductServices } from './product.service'
import { useGlobalContext } from '@/contexts/MainContext'
import { ProductDto } from './dto/product.dto'
import { IconButton } from '@mui/material'
import { DeleteForeverSharp, EditSharp } from '@mui/icons-material'

export default function CategoryPage() {
  const [products, setProducts] = useState<ProductDto[]>([])

  const { showNotify } = useGlobalContext()

  useEffect(() => {
    ProductServices.findAllProducts()
      .then(result => setProducts(result))
      .catch(err => showNotify(err))
  }, [])

  // console.log(products)

  return (
    <Container>
      <Typography component="h1" variant="h3">
        Products
      </Typography>

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
              {products.map(product => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">{product.state}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">{product.programmable}</TableCell>
                  <TableCell align="left">{product.sub_category}</TableCell>
                  <TableCell align="left">{product.category_id}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      // onClick={() => handleEditButton(product)}
                    >
                      <EditSharp color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      // onClick={() => handleDeleteButton(product.id)}
                    >
                      <DeleteForeverSharp color="error" />
                    </IconButton>
                  </TableCell>

                  {/* <TableCell align="left">
                    {product.state === true ? (
                      <CheckCircleOutlineSharpIcon color="success" />
                    ) : (
                      <HighlightOffSharpIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell> */}
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
