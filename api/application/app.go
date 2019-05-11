package application

// App .. An abstraction over the context in which the app will run so that lambda, local testing, and local web server can be swaped out
type App interface {
	Start()
}
