import Popcorn from 'popcorn-sdk'

import BookmarkAdapter from './BookmarkAdapter'

const SDK = Popcorn
SDK.setBookmarkAdapter(BookmarkAdapter)

export default SDK
