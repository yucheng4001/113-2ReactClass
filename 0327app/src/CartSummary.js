import React from 'react';

export default function CartSummary({products}) {

    const totalQuantity = products.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = products.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
    const cartItems = products.filter(item => item.quantity > 0);

    return (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'gray' }}>
            <h2>購物車清單</h2>
            {cartItems.length === 0 ? (<p>購物車是空的</p>) : (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                <th style={{ textAlign: 'left', padding: '8px' }}>品名</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>數量</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>單價</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>{item.name}</td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ width: '40px', height: '40px', margin: '10px', overflow: 'hidden' }}>
                                            <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <div>
                                            <p style={{ margin: "0" }}>{item.name}</p>
                                            <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>評分：{item.rating}</p>
                                        </div>
                                    </div>
                                    <td />
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        ${(item.price || 0).toLocaleString()}
                                    </td>
                                    <td style={{ textAlign: "center", padding: "8px" }}>
                                        {item.quantity}
                                    </td>
                                    <td style={{ textAlign: "right", padding: "8px", fontWeight: "bold" }}>
                                        ${((item.price || 0) * item.quantity).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                        <p style={{ fontWeight: "bold" }}>總數量：{totalQuantity}</p>
                        <p style={{ fontWeight: "bold" }}>總價：${totalPrice.toLocaleString()}</p>
                    </div>

                </>)}
        </div>
    );
}