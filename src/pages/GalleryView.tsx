import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

function GalleryView() {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [artworkType, setArtworkType] = useState('All')

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

    const artworkTypes = [...new Set(artworks.map((artwork) => artwork.artwork_type_title).filter((type): type is string => type !== null))]
    const filteredArtworks = artworks.filter((artwork) => {
        return artworkType === 'All' || artwork.artwork_type_title === artworkType
    })

    return (
        <main className="gallery-page">
            <h1>Art Gallery</h1>
            <div className="artwork-type-buttons">
                <button className={artworkType === 'All' ? 'active' : ''} onClick={() => setArtworkType('All')}>All</button>
                {artworkTypes.map((type) => (<button key={type} onClick={() => setArtworkType(type)} className={artworkType === type ? 'active' : ''}>{type}</button>))}
            </div>
            <div className="gallery-artworks-section">
                {filteredArtworks.map((artwork) => (
                    <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
                        {artwork.image_id && (
                            <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/100,/0/default.jpg`} alt={artwork.title} referrerPolicy="no-referrer" />
                        )}
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default GalleryView