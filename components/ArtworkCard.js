import useSWR from 'swr'
import Error from 'next/error'
import Link from 'next/link'
import { Button, Card } from 'react-bootstrap'

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    )

    if (error) return <Error statusCode={404} />

    if (!data && !error) return null

    return (
        <Card>
            <Card.Img
                src={
                    data?.primaryImageSmall ||
                    'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'
                }
            ></Card.Img>
            <Card.Body>
                <Card.Title>{data?.title || 'N/A'}</Card.Title>
                <Card.Text>
                    Date:&nbsp;{data?.objectDate || 'N/A'}
                    <br />
                    Classification:&nbsp;
                    {data?.classification || 'N/A'}
                    <br />
                    Medium:&nbsp;{data?.medium || 'N/A'}
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant='outline-primary' className='btn-sm'>
                        {objectID}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}
