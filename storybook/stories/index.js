import React from 'react'
import { View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { storiesOf, addDecorator } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select, number, array } from '@storybook/addon-knobs/react'
import _ from 'lodash'

import CenterView from './CenterView'
import {
  Switch,
  SideMenu,
  Title,
  Heading,
  Heading2,
  Heading3,
  ItemCard,
  PrimaryButton,
  SecondaryButton,
  TopBar,
  SvgIcon,
  TabBar,
  NavigationBar,
  Card,
  ItemsInCategory,
  ItemDetails,
  Stepper,
  Cart,
  CircularButton,
  Order,
  TextField,
  OptionGroup,
  LoadingView,
  FlashNotification,
  FlashNotificationList,
  ItemTags
} from '../../src/components'
import * as icons from '../../assets/iconData'
import type { SideMenuRoute } from '../../src/components/navigation/SideMenu'
import type {
  ShoppingCart, ShoppingCategory, ShoppingItem, ShoppingItemChoice,
  ShoppingItemTag
} from '../../src/types/shopping'
import type { Option } from '../../src/components/controls/OptionGroup'
import type { FlashNotificationData } from '../../src/components/misc/FlashNotification'
import { asHoursAndMinutesInUTC } from '../../src/utils/shopping/categoryHelpers'


/**
 * SAMPLE DATA
 */

// TabBar
const tabData = [{
  title: 'Room Service',
  id: '0'
}, {
  title: 'Restaurants',
  id: '1'
}]
const tabIds = tabData.map(tab => tab.id)

// SideMenu
const routes: SideMenuRoute[] = [
  {
    title: 'Home',
    routeKey: 'home-route',
    iconData: icons.home
  },
  {
    title: 'Food',
    routeKey: 'food-route',
    iconData: icons.food
  }
]
const routeKeys = routes.map(route => route.routeKey)

// Shopping
const toppingsChoice: ShoppingItemChoice = {
  id: 'toppings-choice-id',
  title: 'Toppings',
  defaultOptionId: 'topping-1',
  options: [
    { id: 'topping-1', title: 'Mango Salsa', price: '0.500', choiceId: 'toppings-choice-id' },
    { id: 'topping-2', title: 'Guacamole', price: '0.700', choiceId: 'toppings-choice-id' },
    { id: 'topping-3', title: 'Lime', choiceId: 'toppings-choice-id' },
    { id: 'topping-4', title: 'Crushed Nachos', choiceId: 'toppings-choice-id' },
    { id: 'topping-5', title: 'Cheese', choiceId: 'toppings-choice-id' },
    { id: 'topping-6', title: 'Sour Cream', choiceId: 'toppings-choice-id' },
    { id: 'topping-7', title: 'Jalapenos', choiceId: 'toppings-choice-id' }
  ]
}

const sauceChoice: ShoppingItemChoice = {
  id: 'sauce-choice-id',
  title: 'Sauce',
  minimumNumberOfSelections: 1,
  maximumNumberOfSelections: 1,
  defaultOptionId: 'sauce-1',
  options: [
    { id: 'sauce-1', title: 'No Sauce', choiceId: 'sauce-choice-id' },
    { id: 'sauce-2', title: 'Lime Yogurt', choiceId: 'sauce-choice-id' },
    { id: 'sauce-3', title: 'Chile Con Queso', choiceId: 'sauce-choice-id' },
    { id: 'sauce-4', title: 'Spicy Chipotle', choiceId: 'sauce-choice-id' }
  ]
}

const extrasChoice: ShoppingItemChoice = {
  id: 'extras-choice-id',
  title: 'Extras',
  minimumNumberOfSelections: 1,
  maximumNumberOfSelections: 5,
  options: [
    { id: 'extra-1', title: 'Mango Salsa', price: '0.500', choiceId: 'extras-choice-id' },
    { id: 'extra-2', title: 'Guacamole', price: '0.700', choiceId: 'extras-choice-id' },
    { id: 'extra-3', title: 'Lime', choiceId: 'extras-choice-id' },
    { id: 'extra-4', title: 'Crushed Nachos', choiceId: 'extras-choice-id' },
    { id: 'extra-5', title: 'Cheese', choiceId: 'extras-choice-id' },
    { id: 'extra-6', title: 'Sour Cream', choiceId: 'extras-choice-id' },
    { id: 'extra-7', title: 'Jalapenos', choiceId: 'extras-choice-id' }
  ]
}

const cerealsTag: ShoppingItemTag = {
  id: 'cereals-tag-id',
  title: 'Cereals'
}

const seafoodTag: ShoppingItemTag = {
  id: 'seafood-tag-id',
  title: 'Seafood'
}

const shoppingItem1: ShoppingItem = {
  id: 'item-1-id',
  title: 'Mexican Omelet',
  description: 'Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a ' +
  'side of roasted potatoes, and your choice of toast or croissant.',
  price: '16',
  choices: [toppingsChoice, sauceChoice, extrasChoice],
  tags: [cerealsTag, seafoodTag]
}

const shoppingItem2: ShoppingItem = {
  id: 'sample-id-2',
  title: 'Tiramisu',
  description: 'Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ' +
  'ladyfingers, topped with Valrhona cocoa powder.',
  price: '15',
  choices: [toppingsChoice, sauceChoice, extrasChoice],
  tags: [cerealsTag, seafoodTag],
  image2x: 'file:///Users/evrimfeyyaz/workspace/roommate_client/assets/sample_images/baked-dijon-salmon.jpg',
  thumbnail2x:
    'file:///Users/evrimfeyyaz/workspace/roommate_client/assets/sample_images/smoked-salmon-eggs-benedict-thumbnail.jpg'
}

const shoppingItems = _.times(20, (n) => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    return { ...shoppingItem1, id: n }
  }

  return { ...shoppingItem2, id: n }
})

const shoppingCategory: ShoppingCategory = {
  id: 'shopping-category',
  title: 'Breakfast',
  items: shoppingItems
}

const now = new Date()
const hourLater = new Date(now.setHours(now.getHours() + 1))
const twoHoursLater = new Date(now.setHours(now.getHours() + 1))
const unavailableShoppingCategory: ShoppingCategory = {
  ...shoppingCategory,
  availableFrom: asHoursAndMinutesInUTC(hourLater),
  availableUntil: asHoursAndMinutesInUTC(twoHoursLater)
}

const shoppingCartItem1 = {
  id: 'shopping-cart-item-1-id',
  item: shoppingItem1,
  quantity: 1
}

const shoppingCartItem2 = {
  id: 'shopping-cart-item-2-id',
  item: shoppingItem2,
  quantity: 2
}

const cart: ShoppingCart = {
  cartItems: {
    [shoppingCartItem1.id]: shoppingCartItem1,
    [shoppingCartItem2.id]: shoppingCartItem2
  },
  specialRequest: undefined
}

const paymentOptions: Option[] = [
  {
    id: 'room_bill',
    label: 'Room bill'
  },
  {
    id: 'credit_card_on_delivery',
    label: 'Credit card on delivery'
  },
  {
    id: 'cash_on_delivery',
    label: 'Cash on delivery'
  }
]
const paymentOptionIds = paymentOptions.map(option => option.id)

const flashNotifications: FlashNotificationData[] = [
  {
    id: 'message-1',
    message: 'We received your order!',
    type: 'success'
  },
  {
    id: 'message-2',
    message: 'Your battery is about to die.',
    type: 'warning'
  },
  {
    id: 'message-3',
    message: 'There was an issue processing your credit card.',
    type: 'error'
  }
]

/**
 * GLOBAL DECORATORS
 */

addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
addDecorator(withKnobs)

/**
 * STORIES
 */

storiesOf('Typography', module)
  .add('title', () => (
    <Title>Page Title</Title>
  ))
  .add('heading', () => (
    <Heading>Heading</Heading>
  ))
  .add('heading 2', () => (
    <Heading2>Heading 2</Heading2>
  ))
  .add('heading 3', () => (
    <Heading3>Heading 3</Heading3>
  ))

storiesOf('Icons', module)
  .add('home', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={icons.home} />
  ))
  .add('food', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={icons.food} />
  ))
  .add('left arrow', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.leftArrow} />
  ))
  .add('minus', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.minus} />
  ))
  .add('plus', () => (
    <SvgIcon height={48} width={48} fill="#fff" stroke="#fff" strokeWidth={1} iconData={icons.plus} />
  ))
  .add('check', () => (
    <SvgIcon height={48} width={48} fill="#fff" iconData={icons.check} />
  ))

storiesOf('Navigation', module)
  .add('navigation bar', () => (
    <NavigationBar onBackButtonPress={action('back-button-tap')} title="Room Service" />
  ))
  .add('side menu', () => ( // TODO: Fix this.
    <SideMenu
      routes={routes}
      activeRouteKey={select('Active Route', routeKeys, routeKeys[0])}
      sideMenuItemTapped={action('side-menu-item-tap')}
    />
  ))
  .add('top bar', () => (
    <TopBar title="Home" />
  ))
  .add('tab bar', () => (
    <TabBar
      data={tabData}
      onTabPress={action('tab-press')}
      activeTabId={select('Active Tab', tabIds, tabIds[0])}
    />
  ))
  .add('tab bar (small)', () => (
    <TabBar
      data={tabData}
      onTabPress={action('tab-press')}
      activeTabId={select('Active Tab', tabIds, tabIds[0])}
      small
    />
  ))

storiesOf('Shopping', module)
  .add('items in available category', () => (
    <View style={{ height: '80%' }}>
      <ItemsInCategory
        numOfColumns={4}
        category={shoppingCategory}
        onItemPress={action('item-in-available-category-press')}
      />
    </View>
  ))
  .add('items in unavailable category', () => (
    <View style={{ height: '80%' }}>
      <ItemsInCategory
        numOfColumns={4}
        category={unavailableShoppingCategory}
        onItemPress={action('item-in-unavailable-category-press')}
      />
    </View>
  ))
  .add('item card without thumbnail', () => (
    <ItemCard item={shoppingItem1} onPress={action('item-card-press')} />
  ))
  .add('item card with thumbnail', () => (
    <ItemCard item={shoppingItem2} onPress={action('item-card-press')} />
  ))
  .add('item details without image', () => (
    <ItemDetails
      item={shoppingItem1}
      style={{ width: 800, height: 600 }}
      onCloseButtonPress={action('item-details-close-button-press')}
      onAddButtonPress={action('item-details-add-button-press')}
    />
  ))
  .add('item details with image', () => (
    <ItemDetails
      item={shoppingItem2}
      style={{ width: 800, height: 600 }}
      onCloseButtonPress={action('item-details-close-button-press')}
      onAddButtonPress={action('item-details-add-button-press')}
    />
  ))
  .add('cart', () => (
    <Cart
      cart={cart}
      onClearButtonPress={action('cart-clear-button-press')}
      onReviewButtonPress={action('cart-review-button-press')}
      onQuantityStepperPress={action('cart-quantity-stepper-press')}
      onRemoveButtonPress={action('cart-remove-button-press')}
    />
  ))
  .add('order', () => (
    <View style={{ width: 400 }}>
      <Order
        cart={cart}
        paymentOptions={paymentOptions}
        selectedPaymentOptionValue={select('Selected Payment Option', paymentOptionIds, paymentOptionIds[0])}
        onChangeSpecialRequest={action('order-special-request-change')}
        onPaymentOptionPress={action('order-payment-option-press')}
        placeOrderButtonPress={action('order-place-order-button-press')}
      />
    </View>
  ))
  .add('item tags', () => (
    <ItemTags item={shoppingItem1} />
  ))


storiesOf('Controls', module)
  .add('stepper', () => (
    <Stepper minValue={1} value={number('Stepper value', 1)} onButtonPress={action('stepper-button-press')} />
  ))
  .add('primary button', () => (
    <PrimaryButton
      title="Book a Table"
      onPress={action('primary-button-press')}
    />
  ))
  .add('secondary button', () => (
    <SecondaryButton
      title="Wake-Up Alarm"
      onPress={action('secondary-button-press')}
      iconData={icons.alarmClock}
    />
  ))
  .add('circular button', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
    />
  ))
  .add('circular button (small)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      small
    />
  ))
  .add('circular button (disabled)', () => (
    <CircularButton
      onPress={action('circular-button-press')}
      iconData={icons.plus}
      disabled
    />
  ))
  .add('switch', () => (
    <Switch
      onTitle="On"
      offTitle="Off"
      style={{ width: 180 }}
      onPress={action('switch-tap')}
      value={boolean('Value', true)}
    />
  ))
  .add('text field', () => (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView centerContent>
        <View style={{ width: 200, height: 400, justifyContent: 'center' }}>
          <TextField
            label="Name"
            onChangeText={action('text-field-text-changed')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ))
  .add('single-selection option group', () => (
    <OptionGroup
      options={paymentOptions}
      selectedOptionIds={[select('Selected Radio Option', paymentOptionIds, paymentOptionIds[0])]}
      onOptionPress={action('single-selection-option-group-option-pressed')}
    />
  ))
  .add('multiple-selection option group', () => (
    <OptionGroup
      allowMultipleSelection
      options={paymentOptions}
      selectedOptionIds={array('Selected Checkbox Option IDs', [paymentOptionIds[0]])}
      onOptionPress={action('multiple-selection-option-group-option-pressed')}
    />
  ))

storiesOf('Miscellaneous', module)
  .add('card', () => (
    <Card style={{ width: 300, height: 300 }} />
  ))
  .add('loading view', () => (
    <LoadingView message="We are sending your order." />
  ))
  .add('flash notification', () => (
    <FlashNotification message="Your order will be delivered within 45 minutes." />
  ))
  .add('flash notification list', () => (
    <FlashNotificationList notifications={flashNotifications} />
  ))