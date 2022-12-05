import { ArtworkCardDetail } from '../../components'
import { useRouter } from 'next/router'
import { Row, Col } from 'react-bootstrap'

export default function ArtworkById() {
    const { query } = useRouter()

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={query.objectID} />
            </Col>
        </Row>
    )
}
