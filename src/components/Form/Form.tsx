import { useState, ChangeEvent, FormEvent } from "react"
import { countries } from "../../data"
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"
import styles from './Form.module.css'

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
    notFound: boolean
}

export default function Form({fetchWeather, notFound} : FormProps) {

    const [ search, setSearch ] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [ alert, setAlert ] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>){

        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')

            setTimeout(() => {
                setAlert('')
            }, 3000);

            return
        }

        // Consultar API
        fetchWeather(search)
        setSearch({
            city: '',
            country: ''
        })
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

        {notFound && <Alert>Ciudad no encontrada</Alert>}
        {alert && <Alert>{alert}</Alert>}

        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>

            <input 
                type="text" 
                name="city" 
                id="city"
                placeholder="Ciudad" 
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais:</label>

            <select
                name="country" 
                id="country"
                value={search.country}
                onChange={handleChange}
            >
                <option value="">-- Seleccione un pais --</option>

                {countries.map(country => (
                    <option value={country.code} key={country.code}>{country.name}</option>
                ))}
            </select>
        </div>

        <input type="submit" value="Consultar Clima" />
    </form>
  )
}
