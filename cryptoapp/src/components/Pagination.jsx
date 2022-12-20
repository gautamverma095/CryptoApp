import { Button } from '@chakra-ui/react'
import React from 'react'

const forArray = (n) => {

  return new Array(n).fill(0)

}

const Pagination = ({

  totalPage,
  currentPage,
  handlePage
}) => {
  const pages = forArray(totalPage).map((el, index) => {

    return (
      <Button bgColor={"blackAlpha.900"}
        color={"white"}
      
        key={index} disabled={currentPage == index + 1} onClick={() => handlePage(index + 1)}>
        {index + 1}
      </Button>
    )

  })


  return (
    <div>
      {pages}
    </div>
  )
}

export default Pagination