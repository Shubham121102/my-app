import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'

import { addToHistory } from '../lib/userData'

export default function AdvancedSearch() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            q: '',
            tag: 'title',
            geoLocation: '',
            medium: '',
            isHighlight: false,
            isOnView: false
        }
    })

    const submitForm = async (data) => {
        let searchQuery = `${data.tag}=true&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`
        if (data.geoLocation) searchQuery += `&geoLocation=${data.geoLocation}`
        if (data.medium) searchQuery += `&medium=${data.medium}`

        setSearchHistory(await addToHistory(searchQuery))
        router.push(`/artwork?${searchQuery}`)
    }

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                    <Form.Group className={`mb-3 ${errors.q && 'has-danger'}`}>
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            name='q'
                            className={
                                errors.q?.type === 'required' && 'is-invalid'
                            }
                            {...register('q', { required: true })}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select
                        name='tag'
                        className='mb-3'
                        {...register('tag')}
                    >
                        <option value='title'>Title</option>
                        <option value='tags'>Tags</option>
                        <option value='artistOrCulture'>
                            Artist or Culture
                        </option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            name='geoLocation'
                            {...register('geoLocation')}
                        />
                        <Form.Text className='text-muted'>
                            Case Sensitive String (ie &quot;Europe&quot;,
                            &quot;France&quot;, &quot;Paris&quot;,
                            &quot;China&quot;, &quot;New York&quot;, etc.), with
                            multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Medium</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            name='medium'
                            {...register('medium')}
                        />
                        <Form.Text className='text-muted'>
                            Case Sensitive String (ie: &quot;Ceramics&quot;,
                            &quot;Furniture&quot;, &quot;Paintings&quot;,
                            &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.),
                            with multiple values separated by the | operator
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check
                        type='checkbox'
                        label='Highlighted'
                        name='isHighlight'
                        {...register('isHighlight')}
                    />
                    <Form.Check
                        type='checkbox'
                        label='Currently on View'
                        name='isOnView'
                        {...register('isOnView')}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button
                        variant='primary'
                        type='submit'
                        className='btn-md'
                        disabled={Object.keys(errors).length > 0}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
