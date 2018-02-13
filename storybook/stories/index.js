import React from 'react'
import { View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { storiesOf, addDecorator } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select, number, array } from '@storybook/addon-knobs/react'

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
  CheckboxGroup
} from '../../src/components'
import * as icons from '../../assets/iconData'
import type { SideMenuRoute } from '../../src/components/navigation/SideMenu'
import type { ShoppingCart, ShoppingItem, ShoppingItemChoice } from '../../src/types/shopping'
import type { Option } from '../../src/components/controls/OptionGroup'
import type { FlashNotificationData } from '../../src/components/misc/FlashNotification'


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
    { id: 'topping-1', title: 'Mango Salsa', price: 0.500 },
    { id: 'topping-2', title: 'Guacamole', price: 0.700 },
    { id: 'topping-3', title: 'Lime' },
    { id: 'topping-4', title: 'Crushed Nachos' },
    { id: 'topping-5', title: 'Cheese' },
    { id: 'topping-6', title: 'Sour Cream' },
    { id: 'topping-7', title: 'Jalapenos' }
  ]
}

const sauceChoice: ShoppingItemChoice = {
  id: 'sauce-choice-id',
  title: 'Sauce',
  minimumNumberOfSelections: 1,
  maximumNumberOfSelections: 1,
  defaultOptionId: 'sauce-1',
  options: [
    { id: 'sauce-1', title: 'No Sauce' },
    { id: 'sauce-2', title: 'Lime Yogurt' },
    { id: 'sauce-3', title: 'Chile Con Queso' },
    { id: 'sauce-4', title: 'Spicy Chipotle' }
  ]
}

const extrasChoice: ShoppingItemChoice = {
  id: 'extras-choice-id',
  title: 'Extras',
  minimumNumberOfSelections: 1,
  maximumNumberOfSelections: 5,
  options: [
    { id: 'extra-1', title: 'Mango Salsa', price: 0.500 },
    { id: 'extra-2', title: 'Guacamole', price: 0.700 },
    { id: 'extra-3', title: 'Lime' },
    { id: 'extra-4', title: 'Crushed Nachos' },
    { id: 'extra-5', title: 'Cheese' },
    { id: 'extra-6', title: 'Sour Cream' },
    { id: 'extra-7', title: 'Jalapenos' }
  ]
}

const shoppingItem1: ShoppingItem = {
  id: 'item-1-id',
  title: 'Mexican Omelet',
  description: 'Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a ' +
  'side of roasted potatoes, and your choice of toast or croissant.',
  price: '16',
  choices: [toppingsChoice, sauceChoice, extrasChoice]
}

const shoppingItem2: ShoppingItem = {
  id: 'sample-id-2',
  title: 'Tiramisu',
  description: 'Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ' +
  'ladyfingers, topped with Valrhona cocoa powder.',
  price: '15',
  choices: [toppingsChoice, sauceChoice, extrasChoice],
  image2x: 'file:///Users/evrimfeyyaz/workspace/roommate_client/assets/sample_images/baked-dijon-salmon.jpg',
  thumbnail2x:
    'file:///Users/evrimfeyyaz/workspace/roommate_client/assets/sample_images/smoked-salmon-eggs-benedict-thumbnail.jpg'
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
  .add('side menu', () => (
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
  .add('item card without thumbnail', () => (
    <ItemCard item={shoppingItem1} onPress={action('on-item-card-press')} />
  ))
  .add('item card with thumbnail', () => (
    <ItemCard item={shoppingItem2} onPress={action('on-item-card-press')} />
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