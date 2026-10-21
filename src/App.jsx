import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [previousSubmittedEmail, setPreviousSubmittedEmail] = useState('')

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const previousEmailRef = useRef('')

  const refs = {
    name: nameRef,
    email: emailRef,
    password: passwordRef,
  }

  const validateForm = (values) => {
    const nextErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = ['name', 'email', 'password'].find(
        (fieldName) => nextErrors[fieldName],
      )

      refs[firstInvalidField].current?.focus()
      setStatusMessage('Please correct the highlighted fields.')
      return
    }

    setPreviousSubmittedEmail(previousEmailRef.current)
    previousEmailRef.current = formData.email
    setStatusMessage('Your account has been created.')
  }

  return (
    <main className="app-shell">
      <section className="form-card" aria-labelledby="form-title">
        <header className="form-header">
          <span className="form-icon" aria-hidden="true">✦</span>
          <h1 id="form-title">Create your account</h1>
          <p>Enter your details to get started.</p>
        </header>

        <form noValidate onSubmit={handleSubmit} className="registration-form">
          <div className="field-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              ref={nameRef}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name ? (
              <p id="name-error" className="error-message" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email ? (
              <p id="email-error" className="error-message" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              ref={passwordRef}
              value={formData.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            <span className="field-hint">Use at least 8 characters.</span>
            {errors.password ? (
              <p id="password-error" className="error-message" role="alert">
                {errors.password}
              </p>
            ) : null}
          </div>

          <button type="submit" className="submit-button">
            Create account
          </button>

          <div aria-live="polite" className="form-status">
            {statusMessage}
          </div>

          {previousSubmittedEmail ? (
            <p className="previous-email">
              Previous email: {previousSubmittedEmail}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default App
