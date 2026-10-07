import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './AppView.css'

interface Artwork {
    id: number
    title: string
    artist_title: string | null
    date_display: string | null
    date_start: number | null
    description: string | null
    short_description: string | null
    medium_display: string | null
    artwork_type_title: string | null
    department_title: string | null
    image_id: string | null
}

function DetailView() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [artwork, setArtwork] = useState<Artwork | null>(null)
    const [artworks, setArtworks] = useState<Artwork[]>([])

    useEffect(() => {
        axios
            .get(
                `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,date_display,date_start,description,short_description,medium_display,artwork_type_title,department_title,image_id`
            )
            .then((response) => {
                setArtwork(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching artwork:', error)
            })
    }, [id])

    useEffect(() => {
        axios
            .get(
                `https://api.artic.edu/api/v1/artworks?limit=100&fields=id,title,artist_title,date_display,date_start,description,short_description,medium_display,artwork_type_title,department_title,image_id`
            )
            .then((response) => {
                setArtworks(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching artwork:', error)
            })
    }, [])

    if (!artwork) {
        return <p>Loading...</p>
    }

    const current = artworks.findIndex((item) => item.id === artwork.id)
    const previousArtwork = current > 0 ? artworks[current - 1] : null
    const nextArtwork = current < artworks.length - 1 ? artworks[current + 1] : null

    return (
        <main className="detail-view-page">
            <div className="detail-view-navigation">
                <button onClick={() => previousArtwork && navigate(`/artwork/${previousArtwork.id}`)} disabled={!previousArtwork}>&lt;</button>
                <button onClick={() => nextArtwork && navigate(`/artwork/${nextArtwork.id}`)} disabled={!nextArtwork}>&gt;</button>
            </div>
            <h1>{artwork.title}</h1>
            <div className="detail-view-content">
                <div className="detail-view-artwork">
                    {artwork.image_id && (
                        <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`} alt={artwork.title} referrerPolicy="no-referrer" />
                    )}
                </div>
                <div className="detail-view-info">
                    <p>Artist: {artwork.artist_title || 'Unknown'}</p>
                    <p>Date: {artwork.date_display || 'Unknown'}</p>
                    <p>Medium: {artwork.medium_display || 'Unknown'}</p>
                    <p>Artwork Type: {artwork.artwork_type_title || 'Unknown'}</p>
                    <p>Description: {artwork.description || artwork.short_description || 'Unknown'}</p>
                    <p>Department: {artwork.department_title || 'Unknown'}</p>
                    <p>Artwork ID: {id}</p>
                </div>
            </div>
        </main>
    )
}

export default DetailView