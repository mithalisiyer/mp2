import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

function ListView() {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('title')
    const [sortOrder, setSortOrder] = useState('asc')

    useEffect(() => {
        axios
            .get(
                'https://api.artic.edu/api/v1/artworks?limit=100&fields=id,title,artist_title,date_display,date_start,description,short_description,medium_display,artwork_type_title,department_title,image_id'
            )
            .then((response) => {
                setArtworks(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching artworks:', error)
            })
    }, [])

    const filteredAndSortedArtworks = artworks.filter((artwork) =>
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
        .sort((a, b) => {
            if (sortBy === 'title') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            }
            if (sortBy === 'artist_title') {
                const aArtist = a.artist_title || ''
                const bArtist = b.artist_title || ''
                return sortOrder === 'asc'
                    ? aArtist.localeCompare(bArtist)
                    : bArtist.localeCompare(aArtist)
            }
            if (sortBy === 'date_start') {
                const aDate = a.date_start ?? 0
                const bDate = b.date_start ?? 0
                return sortOrder === 'asc'
                    ? aDate - bDate
                    : bDate - aDate
            }
            return 0

        })

    return (
        <main className="full_page">
            <h1 className="list-view-title">Art Explorer</h1>
            <section className="list-view-controls">
                <input
                    type="text"
                    placeholder="Search for artworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="sort-section">
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="artist_title">Artist</option>
                        <option value="date_start">Year</option>
                    </select>
                    <div className="sort-order">
                        <input type="radio" id="asc" name="sort" value="asc" checked={sortOrder === 'asc'} onChange={(e) => setSortOrder(e.target.value)} />
                        <label htmlFor="asc">Ascending</label>
                        <input type="radio" id="desc" name="sort" value="desc" checked={sortOrder === 'desc'} onChange={(e) => setSortOrder(e.target.value)} />
                        <label htmlFor="desc">Descending</label>
                    </div>
                </div>
            </section>
            <section className="artworks-section">
                {filteredAndSortedArtworks.map((artwork) => (
                    <Link className="artwork-card" to={`/artwork/${artwork.id}`} key={artwork.id}>
                        <div className="artwork-card-content">
                            <div className="artwork-image-container">
                                {artwork.image_id && (
                                    <img className="artwork-image" src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`} alt={artwork.title} referrerPolicy="no-referrer" />
                                )}
                            </div>
                            <div className="artwork-info">
                                <h2>{artwork.title}</h2>
                                <p>Artist: {artwork.artist_title || 'Unknown'}</p>
                                <p>Year: {artwork.date_start || 'Unknown'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    )
}

export default ListView
