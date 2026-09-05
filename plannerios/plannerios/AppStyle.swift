//
//  AppStyle.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/4/26.
//

import SwiftUI

struct AppBackgroundStyle: ViewModifier {
    func body(content: Content) -> some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color(red: 8/255, green: 12/255, blue: 36/255),      // deep navy
                    Color(red: 34/255, green: 0/255, blue: 68/255)       // deep purple
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .overlay(
                RadialGradient(
                    colors: [.clear, Color.black.opacity(0.25)],
                    center: .center,
                    startRadius: 0,
                    endRadius: 800
                )
                .blendMode(.multiply)
            )
            .ignoresSafeArea()

            content
        }
    }
}

extension View {
    /// Applies the app's standard background styling behind this view.
    func appBackground() -> some View {
        modifier(AppBackgroundStyle())
    }
}
