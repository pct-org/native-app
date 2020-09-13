import gql from 'graphql-tag'

export const SendCommandToTv = gql`
  mutation command($command: String! $quality: String! $_id: String! $itemType: String!) {
    commandToTv(command: $command quality: $quality _id: $_id itemType: $itemType) {
      command
      quality
      itemType
      _id
    }
  }
`

export const SendCommandToMobile = gql`
  mutation command($command: String!) {
    commandToMobile(command: $command) {
      command
    }
  }
`

export const MobileCommandsSubscription = gql`
  subscription watchMobile {
    watch: watchMobile {
      command
    }
  }
`

export const TvCommandsSubscription = gql`
  subscription watchTv {
    watch: watchTv {
      command

      _id
      quality
      itemType
    }
  }
`
