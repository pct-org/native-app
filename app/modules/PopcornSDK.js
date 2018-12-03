import Popcorn from 'popcorn-sdk'

import Adapters from './Adapters'

const SDK = Popcorn

Adapters.forEach(adapter => SDK.addAdapter(adapter))

export default SDK
