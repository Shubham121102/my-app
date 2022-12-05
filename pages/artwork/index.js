import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import { Row, Col, Card, Pagination } from 'react-bootstrap'
import { ArtworkCard } from '../../components'

import validObjectIDList from '../../public/data/validObjectIDList.json'

const PER_PAGE = 12

export default function Artwork() {
    const [artworkList, setArtworkList] = useState([])
    const [page, setPage] = useState(1)
    const router = useRouter()

    let finalQuery = router.asPath.split('?')[1]

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    )

    useEffect(() => {
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter((x) =>
                data?.objectIDs?.includes(x)
            )

            let results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE)
                results.push(chunk)
            }

            setArtworkList(() => results)
            setPage(() => 1)
        }
    }, [data])

    const previousPage = () => {
        if (page > 1) {
            setPage((currPage) => currPage - 1)
        }
    }

    const nextPage = () => {
        if (page < artworkList.length) {
            setPage((currPage) => currPage + 1)
        }
    }

    if (error) return <Error statusCode={404} />
    if (!data && !error) return null

    return (
        <Row className='gy-4'>
            {!artworkList.length ? (
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4>Nothing Here</h4>
                        </Card.Title>
                        <Card.Text>Try searching for something else.</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                artworkList[page - 1].map((objectID) => (
                    <Col lg={3} key={objectID}>
                        <ArtworkCard objectID={objectID} />
                    </Col>
                ))
            )}
            {artworkList.length > 0 && (
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={() => previousPage()} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={() => nextPage()} />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Row>
    )
}
