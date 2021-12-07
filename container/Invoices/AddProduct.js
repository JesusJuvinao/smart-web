import React, { useState } from 'react'
import CreateModal from './modals/CreateModal'
import { Button } from './styled'

const AddProduct = () => {
    const [showCreate, setShowCreate] = useState(false)
    const handleCreateClose = () => setShowCreate(false)
    const handleCreateShow = () => setShowCreate(true)
    const CreateProduct = () => {
        handleCreateShow()
    }
    return (
        <div>
            <Button border variant="primary" size="lg" onClick={() => CreateProduct()}>
          New Product
            </Button>
            <CreateModal
                show={showCreate}
                setShow={setShowCreate}
                handleClose={handleCreateClose}
            />
        </div>
    )
}

export default AddProduct
