import paths from './pathsIndex'
import components from './componentsIndex'
import schemas from './schemasIndex'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Social Handler',
    description: 'API Social Handler',
    version: '1.6.1'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
  },
  servers: [
    {
      url: '/api/',
      description: 'Current Environment'
    },
    {
      url: 'http:localhost:8080/api/',
      description: 'Local Host Server'
    },
    {
      url: 'https://socialhandler.com.br/api/',
      decription: 'Production Environment API'
    }
  ],
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Survey'
    },
    {
      name: 'Template'
    }
  ],
  paths,
  schemas,
  components
}
