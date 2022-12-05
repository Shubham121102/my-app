import useSWR from 'swr'
import Error from 'next/error'
import { Button, Card } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { favouritesAtom } from '../store'

import { addToFavourites, removeFromFavourites } from '../lib/userData'

export default function ArtworkCardDetail({ objectID }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    const { data, error } = useSWR(
        objectID
            ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
            : null
    )

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    const favouritesClicked = async () => {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(objectID))
            setShowAdded((prevState) => false)
        } else {
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded((prevState) => true)
        }
    }

    if (error) return <Error statusCode={404} />
    if (!data && !error) return null

    return (
        <Card>
            {data?.primaryImage && (
                <Card.Img src={data?.primaryImage}></Card.Img>
            )}
            <Card.Body>
                <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                <Card.Text>
                    <b>Date:</b>&nbsp;
                    {data?.objectDate ? data?.objectDate : 'N/A'}
                    <br />
                    <b>Classification:</b>&nbsp;
                    {data?.classification ? data?.classification : 'N/A'}
                    <br />
                    <b>Medium:</b>&nbsp;{data?.medium || 'N/A'}
                </Card.Text>
                <br />
                <Card.Text>
                    <b>Artist:</b>&nbsp;
                    {data?.artistDisplayName || 'N/A'}&nbsp; (
                    {data?.artistDisplayName && (
                        <a
                            href={data?.artistWikidata_URL}
                            target='_blank'
                            rel='noreferrer'
                        >
                            wiki
                        </a>
                    )}
                    )
                    <br />
                    <b>Credit Line:</b>&nbsp;
                    {data?.creditLine || 'N/A'}
                    <br />
                    <b>Dimensions:&nbsp;</b>
                    {data?.dimensions || 'N/A'}
                    <br />
                    <br />
                    <Button
                        variant={showAdded ? 'primary' : 'outline-primary'}
                        onClick={() => favouritesClicked()}
                    >
                        + Favourite {showAdded && '(added)'}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
